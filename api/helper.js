const User = require('../models/User')
const Direction = require('../models/Direction')

export const onAccept = async (acceptedRoute, me) => {

    const hisId = acceptedRoute.owner
    const did = acceptedRoute.direction_id;



    //requestedBy ko requestedTo  of mine
    await User
        .findOne({ _id: me })
        .then(me => {
            (async () => {
                for (var reqById of me.requestedBy) {
                    await User
                        .updateOne({ _id: reqById }, { $pull: { requestedTo: me } })
                        .then((result) => { return }).
                        catch((err) => { console.log(err, "requestedBy ko requestedTo of mine") });

                };
            })();

        })
        .catch(err => { console.log(err, "in requestedBy ko requestedTo  of mine2"); })


    //requestedBy of mine
    await User
        .UpdateOne({ _id: me }, { $set: { requestedBy: [] } })
        .then((result) => { return })
        .catch((err) => { console.log(err, "requestedBy of mine") });

    //requestedTo ko requestedBy of mine
    await User
        .findOne({ _id: me })
        .then(me => {
            (async () => {
                for (var reqToId of me.requestedTo) {
                    await User
                        .updateOne({ _id: reqToId }, { $pull: { requestedBy: me } })
                        .then((result) => { return })
                        .catch((err) => { console.log(err, "in requestedTo ko requestedBy of mine") });
                }
            })();
        })
        .catch(err => console.log(err, ' in requestedTo ko requestedBy of mine2'));
    //requestedTo of mine
    await User
        .updateOne({ _id: me }, { $set: { requestedTo: [] } })
        .then((result) => { return })
        .catch((err) => { console.log(err, "requestedTo of mine") });



    //rejectedTo of mine
    //rejectedBy of rejectedTo of mine

    //acceptedTo of mine
    await User
        .updateOne({ _id: me }, { $set: { acceptedTo: hisId } })
        .then((result) => { return })
        .catch((err) => { console.log(err, "acceptedTo of mine") });

    //acceptedBy of acceptedTo of mine
    await User
        .updateOne({ _id: hisId }, { $set: { acceptedBy: me } })
        .then((result) => { return })
        .catch((err) => { console.log(err, "acceptedBy of acceptedTo of mine") });



    //requestedBy ko requestedTo of his
    await User
        .findOne({ _id: hisId })
        .then(him => {
            (async () => {
                for (var reqById of him.requestedBy) {
                    await User
                        .updateOne({ _id: hisId }, { $set: { rejectedTo: him.requestedBy } })
                        .then((result) => { return })
                        .catch((err) => { console.log(err, "in requestedBy ko requestedTo of his") });

                    await User
                    updateOne({ _id: reqById }, { $pull: { requestedTo: hisId } })
                        .then((result) => { return })
                        .catch((err) => { console.log(err, "in requestedBy ko requestedTo of his") });
                }
            })();
        })
        .then((result) => { return })
        .catch((err) => { console.log(err, "in requestedBy ko requestedTo of his2") });

    //requestedBy of his
    await User
        .updateOne({ _id: hisId }, { $set: { requestedBy: [] } })
        .then((result) => { return })
        .catch((err) => { console.log(err, "in requestedBy of his") });


    //requestedTo ko requestedBy of his
    await User
        .findOne({ _id: hisId })
        .then(him => {
            (async () => {
                for (var reqToId of him.requestedTo) {
                    await User
                        .updateOne({ _id: reqById }, { $pull: { requestedBy: hisId } })
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
        .then((result) => { return })
        .catch((err) => { console.log(err, "in requestedTo of his") });



    //rejectedTo of his
    //rejectedBy of rejectedTo of his






    //Update acceptedTo of mine: set it him only if null
    await User
        .updateOne({ _id: myself }, { $set: { acceptedTo: acceptedRoute.owner } })
        .then((result) => { return }).catch((err) => { console.log(err) });
    console.log("Id to be tested is ", acceptedRoute.user_id);

    //Update notifiedBy of notifiedTo of mine


    //Update notifiedTo of mine: set it empty

    //Update acceptedBy of acceptedTo: set it myself only if acceptedBy was null null
    await User
        .updateOne({ _id: acceptedRoute.owner }, { $set: { acceptedBy: myself } })
        .then((result) => { return }).catch((err) => { console.log(err); });

    await User
        .updateOne({ _id: acceptedRoute.user_id }, { $push: { rejectedTo: {} } })


    //Update notifiedBy of his: set it empty 
    await User
        .updateOne(
            { _id: acceptedRoute.owner },
            { $set: { notifiedBy: [] } }
        )


    //Update rejectedTo of his: set it notifiedBy


    //Update rejectedBy of his

}

export const getNotifiedByUsersId = (masterId) => {
    User
        .findOne({ _id: masterId })
        .then((result) => {
            console.log(result.notifiedBy);
        }).catch((err) => {
            console.log(err);
        });
}