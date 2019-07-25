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



router.post('/edit-profile', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log('name is', req.body.updatedName);
    const errors = {};

    if(req.body.updatedName.length<2 || req.body.updatedName.length>30){
        errors.name = 'Name should be 2 to 30 characters long';
        return res.status(400).json(errors);
    }

    User
        .updateOne({_id:req.user.id}, {$set: {name: req.body.updatedName}})
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(400).json({ msg: "User not found" });
        });
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
