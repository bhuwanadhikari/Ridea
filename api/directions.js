const express = require('express');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Direction = require('../models/Direction');
router = express();





router.get('/get', (req, res) => {
    Direction.find().then(allDirections => {
        if (!allDirections) {
            res.status(404).json({ msg: "No directions has been stored yet" });
        }
        res.status(200).json(allDirections);
        console.log("get directions has been hit");
    })

});

router.post('/add', (req, res) => {
    console.log(req.body.directionData, " is the requested data");
    const newDirection = new Direction({
        directionData: req.body.directionData
    });

    newDirection
    .save()
    .then(newDirection => res.status(200).send(newDirection))
    .catch(err => console.log(err));
    

});




module.exports = router;