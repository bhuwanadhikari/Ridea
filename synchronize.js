const User = require('./models/User');
const Direction = require('./models/Direction');


const synchronize = () => {
    setInterval(async () => {
        console.log("This is working now");

        await Direction
            .find()
            .then(async allDirections => {

                for (const aRoute of allDirections) {
                    var owner = aRoute.owner;
                    var expiryTime;
                    if (process.env.NODE_ENV === "production") {
                        expiryTime = aRoute.rideData.pickupTime + aRoute.rideData.waitFor * 60 * 1000 - 345 * 60 * 1000;
                    } else {
                        expiryTime = aRoute.rideData.pickupTime + aRoute.rideData.waitFor * 60 * 1000;
                    }
                    console.log("Pickup time is ", expiryTime);

                    if (new Date().getTime() > expiryTime - 60000) {

                        await User
                            .findOne({ _id: owner })
                            .then(async user => {
                                const { acceptedBy, acceptedTo } = user;
                                const isShared = acceptedBy || acceptedTo;
                                var label;
                                if (acceptedBy) {
                                    label = 'acceptedBy'
                                }
                                if (acceptedTo) {
                                    label = 'acceptedTo'
                                }

                                if (isShared) {
                                    //----------if owner has already shared,
                                    //update the acceptedTo and acceptedBy

                                    await User
                                        .updateOne(
                                            { _id: owner },
                                            {
                                                $set: {
                                                    requestedBy: [],
                                                    requestedTo: [],
                                                    rejectedBy: [],
                                                    rejectedTo: []
                                                },
                                                $unset: {
                                                    [label]: ''
                                                }
                                            }
                                        )
                                        .then()
                                        .catch(err => console.log('Error in update of shared in sync'));


                                    //delete direction of shared partner
                                    await Direction
                                            .deleteOne({owner: isShared})
                                            .then(result => console.log("Partner's direction is also deleted"))
                                            .catch(err => console.log('Error in deleting partner direction'));

                                } else {
                                    //---------if the owner has not shared

                                    //update requestedBy ko requestedTo of user
                                    await User
                                        .findOne({ _id: owner })
                                        .then(async user => {
                                            await (async () => {
                                                for (var reqById of user.requestedBy) {
                                                    await User
                                                        .updateOne({ _id: reqById }, { $pull: { requestedTo: owner } })
                                                        .then((result) => { return }).
                                                        catch((err) => { console.log(err, "requestedBy ko requestedTo of mine in sync") });
                                                };
                                            })();
                                        })
                                        .catch(err => { console.log(err, "in requestedBy ko requestedTo  of mine2"); })

                                    //requestedTo ko requestedBy of user
                                    await User
                                        .findOne({ _id: owner })
                                        .then(async user => {
                                            await (async () => {
                                                for (var reqToId of user.requestedTo) {
                                                    await User
                                                        .updateOne({ _id: reqToId }, { $pull: { requestedBy: owner } })
                                                        .then((result) => { return })
                                                        .catch((err) => { console.log(err, "in requestedTo ko requestedBy of user sync") });
                                                }
                                            })();
                                        })
                                        .catch(err => console.log(err, ' in requestedTo ko requestedBy of suer 2 sync'));



                                    //requestedBy of user
                                    await User
                                        .updateOne({ _id: owner }, { $set: { requestedBy: [] } })
                                        .then((result) => { return })
                                        .catch((err) => { console.log(err, "requestedBy of user sync") });


                                    //requestedTo of user
                                    await User
                                        .updateOne({ _id: owner }, { $set: { requestedTo: [] } })
                                        .then((result) => { return })
                                        .catch((err) => { console.log(err, "requestedTo of user sync") });
                                }
                            })
                            .catch(err => console.log('Error in find user by owner in sync'))

                        //Delete Direction 
                        await Direction
                            .deleteOne({ _id: aRoute._id })
                            .then(result => console.log("Direction has been deleted"))
                            .catch(err => console.log('Error in deleting the direction', err));
                    }
                }
            });

    }, 5000)
}

module.exports = {
    synchronize
}