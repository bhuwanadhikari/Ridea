const User = require('../models/User')
const Direction = require('../models/Direction')

const onAccept = async (acceptedRoute, myId) => {
    const hisId = acceptedRoute.owner;
    const did = acceptedRoute.direction_id;
    var myRequestedBy;



    //rejectedTo of mine
    await User
        .findOne({ _id: myId })
        .then(async me => {
            console.log('my requested by is', me.requestedBy);
            
            const newRejTo = me.requestedBy.filter(reqById => reqById !== hisId);

            let buffer = me.requestedBy;
            let ind = buffer.indexOf(hisId);

            buffer = buffer.splice(ind, 1);

            console.log("New rejected to array is :", buffer);
            await User
                .updateOne({ _id: myId }, { $set: { rejectedTo: buffer } })
                .then((result) => { return })
                .catch((err) => { console.log(err, "rejectedTo of mine") });

        })
        .catch((err) => { console.log(err, "rejectedTo of mine2") });


    //requestedBy ko requestedTo  of mine
    await User
        .findOne({ _id: myId })
        .then(async me => {

            //set myRequestedBy
            myRequestedBy = me.requestedBy;

            await (async () => {
                for (var reqById of me.requestedBy) {
                    await User
                        .updateOne({ _id: reqById }, { $pull: { requestedTo: myId } })
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


    //requestedTo of mine
    await User
        .updateOne({ _id: myId }, { $set: { requestedTo: [] } })
        .then((result) => { return })
        .catch((err) => { console.log(err, "requestedTo of mine") });

    //rejectedTo ko rejectedBy of mine
    await User
        .findOne({ _id: myId })
        .then(async me => {
            const newRejTo = me.requestedBy.filter(rejToId => rejToId !== hisId);
            for (let rejToId of newRejTo) {
                await User
                    .updateOne({ _id: rejToId }, { $push: { rejectedBy: myId } })
                    .then((result) => { return })
                    .catch((err) => { console.log(err, "rejectedTo ko rejectedBy of mine") });
            }
        })
        .catch((err) => { console.log(err, "rejectedTo ko rejectedBy of mine") });

    //---------------------

    //acceptedTo of mine
    await User
        .updateOne({ _id: myId }, { $set: { acceptedTo: hisId } })
        .then((result) => { return })
        .catch((err) => { console.log(err, "acceptedTo of mine") });

    //requestedBy of mine
    await User
        .updateOne({ _id: myId }, { $set: { requestedBy: [] } })
        .then((result) => { return })
        .catch((err) => { console.log(err, "requestedBy of mine") });


    //acceptedBy of acceptedTo of mine
    await User
        .updateOne({ _id: hisId }, { $set: { acceptedBy: myId } })
        .then((result) => { return })
        .catch((err) => { console.log(err, "acceptedBy of acceptedTo of mine") });

    //------------------------------------------------------------
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

    //requestedBy of his
    await User
        .updateOne({ _id: hisId }, { $set: { requestedBy: [] } })
        .then((result) => { return })
        .catch((err) => { console.log(err, "in requestedBy of his") });


    //requestedTo ko requestedBy of his
    await User
        .findOne({ _id: hisId })
        .then(async him => {
            await (async () => {
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
        .then((result) => { return })
        .catch((err) => { console.log(err, "in requestedTo of his") });
}







const onReject = async (rejectedRoute, myId) => {
    const itsId = rejectedRoute.owner;

    //Update requestedBy of mine
    await User
        .updateOne({ _id: myId }, { $pull: { requestedBy: itsId } })
        .then((result) => { return })
        .catch((err) => { console.log(err, "ONREJECT::Update requestedBy of mine") });


    //Update reqestedTo of his
    await User
        .updateOne({ _id: itsId }, { $pull: { requestedTo: myId } })
        .then((result) => { return })
        .catch((err) => { console.log(err, "ONREJECT::Update reqestedTo of his") });


    //Update rejectedTo of mine
    await User
        .updateOne({ _id: myId }, { $push: { rejectedTo: itsId } })
        .then((result) => { return })
        .catch((err) => { console.log(err, "ONREJECT::Update rejectedTo of mine") });

    //Update rejectedBy of his
    await User
        .updateOne({ _id: itsId }, { $push: { rejectedBy: myId } })
        .then((result) => { return })
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