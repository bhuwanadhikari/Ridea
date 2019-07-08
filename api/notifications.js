const express = require('express');
const passport = require('passport');
const User = require('../models/User');

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
                        directionData: el.direction.directionData
                    }
                    cleanNotifiers.push(aNotifier);
                });
                res.status(200).json(cleanNotifiers);
            }
        })
        .catch(err => console.log(err))
});

module.exports = router;