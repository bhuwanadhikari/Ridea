const User = require('../models/User')
const Direction = require('../models/Direction')

export const recursiveUpdate = async (aRespondedRoute, myself) => {

    //Update acceptedTo of mine: set it him only if null
    await User
        .updateOne({ _id: myself }, { $set: { acceptedTo: aRespondedRoute.user_id } })
        .then((result) => { return }).catch((err) => { console.log(err) });
    console.log("Id to be tested is ", aRespondedRoute.user_id);

    //Update notifiedBy of notifiedTo of mine

    //Update notifiedTo of mine: set it empty

    //Update acceptedBy of acceptedTo: set it myself only if acceptedBy was null null
    await User
        .updateOne({ _id: aRespondedRoute.user_id }, { $set: { acceptedBy: myself } })
        .then((result) => { return }).catch((err) => { console.log(err); });

    await User
        .updateOne({ _id: aRespondedRoute.user_id }, { $push: { rejectedTo: {} } })


    //Update notifiedBy of his: set it empty 
    await User
        .updateOne(
            { _id: aRespondedRoute.user_id },
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