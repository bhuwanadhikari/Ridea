const express = require('express');
const User = require('../models/User');

const router = express();


router.get('/all-users', (req, res) => {
    User
        .find()
        .then(allUsers => {
            res.status(200).json(allUsers);
        })
        .catch(err => {
            console.log(err);
        })
});




module.exports = router;
