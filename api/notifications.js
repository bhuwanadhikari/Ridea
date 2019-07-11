const express = require('express');
const passport = require('passport');
const User = require('../models/User');
const mongoose = require('mongoose');

const ObjectId = mongoose.Types.ObjectId


const router = express();


router.get('/status', passport.authenticate('jwt', { session: false }), (req, res) => {
    const userId = req.params.id;
    User
        .findOne({ _id: req.user.id })
        .then(user => {
            if (!user) {
                res.status(400).json({ error: "User not found for this ID" });
            } else {
                const notificationStatus = user.notifiedBy.length > 0;
                res.status(200).json({ status: notificationStatus });
            }
        })
        .catch(err => console.log(err))
});



router.get('/notified-by', passport.authenticate('jwt', { session: false }), (req, res) => {
    User
        .findOne({ _id: req.user.id })
        .populate('notifiedBy.user')
        .populate('notifiedBy.direction')
        .then(user => {
            if (!user) {

                res.status(400).json({ error: "User not found for this ID" });
            } else {
                const cleanNotifiers = [];
                user.notifiedBy.forEach(el => {
                    const aNotifier = {
                        name: el.user.name,
                        directionData: el.direction.directionData,
                        user_id: el.user._id,
                        direction_id: el.direction._id

                    }
                    cleanNotifiers.push(aNotifier);
                });
                res.status(200).json(cleanNotifiers);
            }
        })
        .catch(err => console.log(err))
});



// router.post('/respond-notification', passport.authenticate('jwt', { session: false }), (req, res) => {

//     const respondedRoutes = req.body.respondedRoutes;
//     const updateFunc = async () => {
//         respondedRoutes.forEach(async (aRoute) => {
//             console.log("My id is given by: ", req.user.id, 'and type is ', typeof(req.user.id));
//             console.log("Id of user on operation is ", aRoute.user_id,  'and after objecting', ObjectId(aRoute.user_id));
//             await User
//                 .updateOne(
//                     { _id: req.user.id },
//                     { $pull: { notifiedBy: { user: aRoute.user_id } } }
//                 )
//                 .then((result) => {
//                     return
//                 }).catch((err) => {
//                     console.log(err);
//                 });

//             if (aRoute.responseStatus === "Accepted") {

// //-------------------------------------
//                 await User
//                     .updateOne(
//                         { _id: req.user.id },
//                         { $set: { acceptedTo: aRoute.user_id } }
//                     )
//                     .then((result) => {
//                         return
//                     }).catch((err) => {
//                         console.log(err);
//                     });

//                     console.log("Id to be tested is ", aRoute.user_id);
//                 await User
//                     .updateOne(
//                         { _id: aRoute.user_id},
//                         { $set: { acceptedBy: req.user.id } }
//                     )
//                     .then((result) => {
//                         return
//                     }).catch((err) => {
//                         console.log(err);
//                     });
// //-----------------------------------------


//             }
//             if (aRoute.responseStatus === "Rejected") {
//                 await User
//                     .updateOne(
//                         { _id: req.user.id },
//                         { $push: { rejectedTo: aRoute.user_id } }
//                     )
//                     .then((result) => {
//                         return
//                     }).catch((err) => {
//                         console.log(err);
//                     });

//                 await User
//                     .updateOne(
//                         { _id: aRoute.user_id},
//                         { $push: { rejectedBy: req.user.id } }
//                     )
//                     .then((result) => {
//                         return
//                     }).catch((err) => {
//                         console.log(err);
//                     });
//             }
//         });
//     }

//     updateFunc()
//         .then(() => {
//             User
//             .findById(req.user.id)
//             .then((result) => {
//                 res.status(200).json(result);
//             }).catch((err) => {
//                 console.log(err);
//             });
//         })
// });

router.get('/testing', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log("Id of mine is ", req.user.id);

    const myFunc = async () => {
        var notifiedByArray = [];   
        console.log("outside first");
        await User
            .findOne({ _id: req.user.id })
            .exec((err, user) => {
                console.log("inside");
                user.notifiedBy.forEach((aNotifiedByRoute) => {
                    notifiedByArray.push(aNotifiedByRoute.user);

                });

            });
        console.log("outside last");
        return notifiedByArray;
    }

    res.json(myFunc());


});

module.exports = router;