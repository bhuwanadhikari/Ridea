const express = require('express');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Direction = require('../models/Direction');
router = express();

const { getMatchedRoute } = require('./routeMatchAlgorithm');






//Pre-addtion of the direction to find the matching route
router.post('/matched-routes', passport.authenticate('jwt', { session: 'false' }), (req, res) => {
    // Find all of the matching routes and algorithm for matching here


    getMatchedRoute(req, res)


});

//get single route data from it's id
router.get('/route/:routeId', passport.authenticate('jwt', { session: 'false' }), (req, res) => {
    console.log("Getting single route from id");
    const errors = {};
    Direction
        .findById(req.params.routeId)
        .then((route) => {
            if (!route) {
                errors.noRoute = "There is no route for this id";
                return res.status(400).json(errors);
            }
            res.status(200).json(route);
        }).catch((err) => {
            errors.noRoute = "There is no route for this id";
            return res.status(400).json(errors);
        });
});


//get direction by owner's id
router.get('/get-direction-by-owner/:ownerId', passport.authenticate('jwt', { session: false }), (req, res) => {

    console.log("Get direction by ower");

    Direction
        .findOne({ owner: req.params.ownerId })
        .then((direction) => {
            if (!direction) {
                res.status(400).json({ msg: 'You have not registered your route' })
            } else {
                res.status(200).json(direction)
            }
        })
        .catch(err => {
            console.log("Error in get-direction-by-ownerid");
        })
})




//get direction owner name, owner and direction id
router.get('/get-by-owner', passport.authenticate('jwt', { session: 'false' }), (req, res) => {
    var activityArr = [];
    User
        .findOne({ _id: req.user.id })
        // .populate(['requestedBy', 'requestedTo', 'rejectedBy', 'rejectedTo'])
        .then(async me => {
            const concerned = ['requestedBy', 'requestedTo', 'rejectedBy', 'rejectedTo'];
            await (async () => {
                for (let aTopic of concerned) {
                    for (let owner of me[aTopic]) {
                        await Direction
                            .findOne({ owner: owner })
                            .populate('owner')
                            .then(direction => {
                                activityObj = {
                                    name: direction.owner.name,
                                    did: direction.id,
                                    owner: direction.owner._id,
                                    label: aTopic
                                }
                                activityArr.push(activityObj);
                            })
                            .catch(err => console.log(err, 'err in getting direction by owner'))
                    }
                }
            })();

            if (me.acceptedBy) {
                await Direction
                    .findOne({ owner: me.acceptedBy })
                    .populate('owner')
                    .then(direction => {
                        activityObj = {
                            name: direction.owner.name,
                            did: direction.id,
                            owner: direction.owner._id,
                            label: 'acceptedBy'
                        }
                        activityArr.push(activityObj);
                    })
            }
            if (me.acceptedTo) {
                await Direction
                    .findOne({ owner: me.acceptedTo })
                    .populate('owner')
                    .then(direction => {
                        activityObj = {
                            name: direction.owner.name,
                            did: direction.id,
                            owner: direction.owner._id,
                            label: 'acceptedTo'
                        }
                        activityArr.push(activityObj);
                    })
            }
            res.status(200).json(activityArr)


        })
        .catch(err => {
            console.log(err, "in get by owner: last");
            res.status(400).json({ errors: 'Something unexpected' });
        })
});

//Addition of new route
router.post('/addition', passport.authenticate('jwt', { session: 'false' }), (req, res) => {
    const newDirection = new Direction({
        ...req.body,
        owner: req.user.id,
    });

    Direction
        .findOne({ owner: req.user.id })
        .then(async (result) => {
            if (result) {
                res.status(400).json({ error: "You have already registered a route" });
            } else {
                await newDirection
                    .save()
                    .then(async newDirection => {
                        if (req.body.selectedRoutes.length > 0) {
                            for (let selectedRouteId of req.body.selectedRoutes) {
                                await Direction.findById(selectedRouteId)
                                    .then(async res => {

                                        await User
                                            .updateOne(
                                                { _id: res.owner },
                                                { $push: { requestedBy: req.user.id } }
                                            )
                                            .then().catch((err) => { console.log(err, 'in addition of direction while pushing to requestedBy') });

                                        await User
                                            .updateOne(
                                                { _id: req.user.id },
                                                { $push: { requestedTo: res.owner } }
                                            )
                                            .then().catch((err) => { console.log(err, 'in addition of direction push to requestedTo') });

                                    })
                                    .catch(err => { throw err });
                            }
                            return newDirection;
                        } else {
                            return newDirection
                        }
                    })
                    .then(async () => {
                        await User
                            .findById(req.user.id)
                            .then((result) => {
                                res.status(200).json(result);
                            }).catch((err) => {
                                console.log("Something has gone wrong");
                                res.status(400).json({ error: "Something gone wrong" });
                            });
                    })
                    .catch(err => console.log(err));
            }
        }).catch((err) => {
            console.log(err, 'in the last of addtion api call');
        });
});



router.get('/have-i', passport.authenticate('jwt', { session: false }), (req, res) => {
    Direction
        .findOne({ $and: [{ owner: req.user.id }, { isOpen: true }] })
        .then((direction) => {
            if (direction) {
                res.status(200).json({ haveI: true });
            } else {
                res.status(200).json({ haveI: false });
            }
        }).catch((err) => {
            res.status(400).json(err);
        });
});




router.get('/all-routes', (req, res) => {
    Direction.find().then(async allDirections => {
        if (!allDirections) {
            res.status(404).json({ msg: "No directions has been stored yet" });
        }
        // const selectedRouteOwner = await Direction.findById('5d1f43e49fe10420c816a239').then(res => res.owner).catch(err => {throw err});
        // console.log("We got something ehre", selectedRouteOwner);


        res.status(200).json(allDirections);
        console.log("get all routes has been hit");
    })

});






module.exports = router;