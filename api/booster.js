const User = require('../models/User')
const Direction = require('../models/Direction')

const onAccept = async (acceptedRoute, myId) => {
    const hisId = acceptedRoute.owner;
    const did = acceptedRoute.direction_id;
    var myRequestedBy;


    await Direction
        .updateOne({owner: myId}, {$set: {isOpen: false}})
        .then((result) => {
            console.log("Directions is closed");    
        }).catch((err) => {
            console.log('Error in updating the isOpen of direction', err);
        });


    await Direction
        .updateOne({owner: hisId}, {$set: {isOpen: false}})
        .then((result) => {
            console.log("Directions is closed");    
        }).catch((err) => {
            console.log('Error in updating the isOpen of direction', err);
        });


    //requestedBy ko requestedTo  of mine
    await User
        .findOne({ _id: myId })
        .then(async me => {
            await (async () => {
                for (var reqById of me.requestedBy) {
                    await User
                        .updateOne({ _id: reqById }, { $pull: { requestedTo: hisId } })
                        .then((result) => { return }).
                        catch((err) => { console.log(err, "requestedBy ko requestedTo of mine") });

                };
            })();

        })
        .catch(err => { console.log(err, "in requestedBy ko requestedTo  of mine2"); })


    //requestedTo ko requestedBy of mine
    await User
        .findOne({ _id: myId })
        .then(async me => {
            await (async () => {
                for (var reqToId of me.requestedTo) {
                    await User
                        .updateOne({ _id: reqToId }, { $pull: { requestedBy: myId } })
                        .then((result) => { return })
                        .catch((err) => { console.log(err, "in requestedTo ko requestedBy of mine") });
                }
            })();
        })
        .catch(err => console.log(err, ' in requestedTo ko requestedBy of mine2'));






    //requestedBy of mine
    await User
        .updateOne({ _id: myId }, { $pull: { requestedBy: hisId } })
        .then((result) => { return })
        .catch((err) => { console.log(err, "requestedBy of mine") });


    //requestedTo of mine
    await User
        .updateOne({ _id: myId }, { $set: { requestedTo: [] } })
        .then((result) => { return })
        .catch((err) => { console.log(err, "requestedTo of mine") });

    //acceptedTo of mine
    await User
        .updateOne({ _id: myId }, { $set: { acceptedTo: hisId } })
        .then((result) => { return })
        .catch((err) => { console.log(err, "acceptedTo of mine") });

    //acceptedBy of acceptedTo of mine
    await User
        .updateOne({ _id: hisId }, { $set: { acceptedBy: myId } })
        .then((result) => { return })
        .catch((err) => { console.log(err, "acceptedBy of acceptedTo of mine") });

    // requestedBy ko rejected



    //requestedBy ko requestedTo of his
    await User
        .findOne({ _id: hisId })
        .then(async him => {
            //rejectedTo of his
            await User
                .updateOne({ _id: hisId }, { $set: { rejectedTo: him.requestedBy } })
                .then(async (result) => {

                    //rejectedTo ko rejectedBy of his
                    await User
                        .findOne({ _id: hisId })
                        .then(async him => {
                            await (async () => {
                                for (var rejToId of him.rejectedTo) {
                                    await User
                                        .updateOne({ _id: rejToId }, { $push: { rejectedBy: hisId } })
                                        .then((result) => { return })
                                        .catch((err) => { console.log(err, "rejectedTo ko rejectedBy of his") });
                                }
                            })();
                        })
                        .then((result) => { return })
                        .catch((err) => { console.log(err, "requestedTo ko requestedBy of his2") });
                })
                .catch((err) => { console.log(err, "in requestedBy ko requestedTo of his") });


            // requestedBy ko requestedTo
            await (async () => {
                for (var reqById of him.requestedBy) {

                    await User
                        .updateOne({ _id: reqById }, { $pull: { requestedTo: hisId } })
                        .then((result) => { return })
                        .catch((err) => { console.log(err, "in requestedBy ko requestedTo of his") });
                }

            })();
        })
        .then((result) => { return })
        .catch((err) => { console.log(err, "in requestedBy ko requestedTo of his2") });


    //requestedTo ko requestedBy of his
    await User
        .findOne({ _id: hisId })
        .then(async him => {
            await (async () => {
                console.log('on requestedTo ko requestedBy of his ++, ', him.requestedTo);
                for (var reqToId of him.requestedTo) {
                    await User
                        .updateOne({ _id: reqToId }, { $pull: { requestedBy: hisId } })
                        .then((result) => { return })
                        .catch((err) => { console.log(err, "requestedTo ko requestedBy of his") });
                }
            })();
        })
        .then((result) => { return })
        .catch((err) => { console.log(err, "requestedTo ko requestedBy of his2") });

    //requestedTo of his
    await User
        .updateOne({ _id: hisId }, { $set: { requestedTo: [] } })
        .then((result) => {
            console.log('on requestedTo of his ++');
            return
        })
        .catch((err) => { console.log(err, "in requestedTo of his") });


    //requestedBy of his
    await User
        .updateOne({ _id: hisId }, { $set: { requestedBy: [] } })
        .then((result) => {
            console.log('on requestedBy of his ++');
            return
        })
        .catch((err) => { console.log(err, "in requestedBy of his") });

}







const onReject = async (rejectedRoute, myId) => {
    const itsId = rejectedRoute.owner;

    //Update requestedBy of mine
    await User
        .updateOne({ _id: myId }, { $pull: { requestedBy: itsId } })
        .then((result) => {
            console.log('on requestedBy of mine --');
            return
        })
        .catch((err) => { console.log(err, "ONREJECT::Update requestedBy of mine") });


    //Update reqestedTo of its
    await User
        .updateOne({ _id: itsId }, { $pull: { requestedTo: myId } })
        .then((result) => {
            console.log('On requested to hi --');
            return
        })
        .catch((err) => { console.log(err, "ONREJECT::Update reqestedTo of his") });


    //Update rejectedTo of mine
    await User
        .updateOne({ _id: myId }, { $push: { rejectedTo: itsId } })
        .then((result) => {
            console.log("on rejected to of mine --");
            return
        })
        .catch((err) => { console.log(err, "ONREJECT::Update rejectedTo of mine") });

    //Update rejectedBy of its
    await User
        .updateOne({ _id: itsId }, { $push: { rejectedBy: myId } })
        .then((result) => {
            console.log('On rejectedBy of Its--');
            return
        })
        .catch((err) => { console.log(err, "ONREJECT::Update rejectedBy of his") });
}








const getNotifiedByUsersId = (masterId) => {
    User
        .findOne({ _id: masterId })
        .then((result) => {
            console.log(result.notifiedBy);
        }).catch((err) => {
            console.log(err);
        });
}

module.exports = {
    onAccept,
    onReject
}