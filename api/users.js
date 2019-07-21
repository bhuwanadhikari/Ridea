const express = require('express');
const passport = require('passport');
const User = require('../models/User');

const router = express();


router.get('/all-users', (req, res) => {
    User
        .find()
        .then(allUsers => {
            res.status(200).json(allUsers);
        })
        .catch(err => {
            console.log(err); passport
        })
});

router.get('/my-data', passport.authenticate('jwt', { session: false }), (req, res) => {
    User
        .findById(req.user.id)
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(400).json({ msg: "User not found" });
        });
});

router.get('/get-user/:palId', passport.authenticate('jwt', { session: false }), (req, res) => {
    User
        .findById(req.params.palId)
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log("Error in get-user route", err);
        });
});




module.exports = router;
