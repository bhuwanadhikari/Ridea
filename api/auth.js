const express = require('express');
const passport = require('passport');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
router = express();


//Load Validation
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');




// auth with google+
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email',]
}));

// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    var token = req.user.token;
    res.redirect("http://localhost:3000/home?token=" + token);
});


//@route api/users/register
// register a new user
// access public
router.post('/register', (req, res) => {

    const { errors, isValid } = validateRegisterInput(req.body);
    //check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }


    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            errors.email = 'Email already exists';
            return res.status(400).json(errors);
        } else {
            const avatar = gravatar.url(req.body.email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            });
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                avatar
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;

                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
    });
});



//@route api/users/login
// return token back which is sent as header to authenticate
// access public
router.post('/login', (req, res) => {

    //Validation of Login Splash
    const { errors, isValid } = validateLoginInput(req.body);
    if (!isValid) {
        return res.status(401).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email }).then((user) => {
        if (!user) {
            errors.email = 'User not found';
            return res.status(401).json(errors);
        }

        bcrypt.compare(password, user.password).then((isMatch) => {
            if (isMatch) {
                //Credentials matched
                payload = { id: user.id, name: user.name, email: user.email };

                jwt.sign(payload, keys.secret, { expiresIn: 36000 * 100 }, (err, token) => {
                    res.json({ success: true, token: 'Bearer ' + token });
                });
            } else {
                errors.password = 'Password Incorrect';
                return res.status(401).json(errors);
            }
        });
    }).catch(); //error of find one
});



router.get('/testauth', passport.authenticate('google'), (req, res) => {
    console.log("url has been hit");
    res.json({ msg: "this is private page" });
});


router.get('/helly', passport.authenticate('jwt'),  (req, res) => {
    res.json({ msg: "this is public page" });
});




module.exports = router;