const express = require('express');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Direction = require('../models/Direction');
router = express();




//Pre-addtion of the direction to find the matching route
router.post('/matched-routes', passport.authenticate('jwt', { session: 'false' }), (req, res) => {
    // Find all of the matching routes and algorithm for matching here

    Direction
        .find({ owner: { $ne: req.user.id } })
        .select('_id')
        .then((matchedRoutes) => {
            console.log(matchedRoutes, "is the matched routes");

            let cleanArray = [];
            if (matchedRoutes.length > 0) {
                matchedRoutes.forEach((routeObject) => {
                    cleanArray.push(routeObject._id);
                })
            }
            res.status(200).json(cleanArray);
        }).catch((err) => {
            console.log(err);
        });


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



//Addition of new route
router.post('/addition', passport.authenticate('jwt', { session: 'false' }), (req, res) => {
    console.log(req.body, " is the requested data");
    const newDirection = new Direction({
        ...req.body,
        owner: req.user.id,
    });

    newDirection
        .save()
        .then(async newDirection => {   
            if (newDirection.selectedRoutes.length > 0) {
                for (let selectedRouteId of newDirection.selectedRoutes) {
                    await Direction
                        .updateOne(
                            { _id: selectedRouteId },
                            { $push: { requestedBy: { user: req.user.id, direction: newDirection._id } } },
                            { $set: { status: true } }
                        )
                        .then(() => {
                            return;
                        }).catch((err) => {
                            throw err;
                        });

                    const selectedRouteOwner = await Direction.findById(selectedRouteId).then(res => res.owner).catch(err => { throw err });
                    await User
                        .updateOne(
                            { _id: selectedRouteOwner },
                            { $push: { notifiedBy: { user: req.user.id, direction: newDirection._id } } },
                            { $set: { status: true } }
                        )
                        .then(() => {
                            return;
                        }).catch((err) => {
                            throw err;
                        });
                }
                Direction.findById(newDirection._id).then(savedDirection => {
                    res.status(200).json(savedDirection);
                })
            } else {
                res.status(200).json(newDirection);
            }
        })
        .catch(err => console.log(err));


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