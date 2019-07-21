const express = require('express');
const passport = require('passport');
const User = require('../models/User');
const mongoose = require('mongoose');
const Direction = require('../models/Direction');
const { onAccept, onReject } = require('./booster');

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



router.get('/requested-by', passport.authenticate('jwt', { session: false }), (req, res) => {
    User
        .findOne({ _id: req.user.id })
        .populate(['requestedBy', 'requestedTo', 'acceptedBy', 'acceptedTo', 'rejectedTo', 'rejectedBy'])
        .then(user => {
            if (!user) {
                res.status(400).json({ error: "User not found for this ID" });
            } else if (user.requestedBy.length > 0) {
                var cleanNotifiers = [];
                var count = 0;
                console.log("--------------------------------------");
                const reqLength = user.requestedBy.length;
                (async () => {
                    for (el of user.requestedBy) {
                        await Direction
                            .findOne({ owner: el._id })
                            .then((direction) => {

                                console.log("Count:", count, "Index:", user.requestedBy.indexOf(el));
                                const aNotifier = {
                                    name: el.name,
                                    directionData: direction.directionData,
                                    owner: el._id,
                                    direction_id: direction._id
                                }

                                cleanNotifiers = [...cleanNotifiers, aNotifier];
                                count++;
                                if (count === reqLength) {
                                    return res.status(200).json(cleanNotifiers);
                                }

                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    }
                })();
                console.log(1);
            } else {
                res.status(200).json([]);
            }
        })
        .catch(err => console.log(err))
});



router.post('/respond', passport.authenticate('jwt', { session: false }), (req, res) => {

    const { respondedRoutes } = req.body;
    const updateFunc = async () => {
        await (async () => {
            for (var aRoute of respondedRoutes) {

                console.log("My id is given by: ", req.user.id, 'and type is ', typeof (req.user.id));
                console.log("Id of user on operation is ", aRoute.owner, 'and after objecting', ObjectId(aRoute.owner));


                if (aRoute.responseStatus === "Accepted") {
                    onAccept(aRoute, req.user.id);
                }


                if (aRoute.responseStatus === "Rejected") {
                    onReject(aRoute, req.user.id);
                }
            }
        })();
    }

    updateFunc()
        .then(() => {
            User
                .findById(req.user.id)
                .then((result) => {
                    res.status(200).json(result);
                }).catch((err) => {
                    console.log(err);
                });
        })
        .catch(err => console.log(err, "in the updateFunc calling"));
});


//Testing
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