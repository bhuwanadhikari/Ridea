const express = require('express');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Direction = require('../models/Direction');
router = express();




//Pre-addtion of the direction to find the matching route
router.post('/matched-routes', passport.authenticate('jwt', { session: 'false' }), (req, res) => {
    // Find all of the matching routes and algorithm for matching here
    const matchedRoutes = ['5d18b3619ce89717a039bcca', '5d18b3c49ce89717a039bccb', '5d18b40b9ce89717a039bccc']
    Direction.find()
        .then(result => res.status(200).send(matchedRoutes))
        .catch(err => console.log(err))


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
        owner: req.user.id
    });

    newDirection
        .save()
        .then(newDirection => res.status(200).send(newDirection))
        .catch(err => console.log(err));


});






router.get('/all-routes', passport.authenticate('jwt', { session: 'false' }), (req, res) => {
    Direction.find().then(allDirections => {
        if (!allDirections) {
            res.status(404).json({ msg: "No directions has been stored yet" });
        }
        res.status(200).json(allDirections);
        console.log("get directions has been hit");
    })

});






module.exports = router;