const express = require('express');
const passport = require('passport');
const User = require('../models/User');

const router = express();

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const userId = req.params.id;   
    User
        .findOne({_id: req.user.id})
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

module.exports = router;