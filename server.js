const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const passportSetup = require('./config/passport');


const app = express();

//database
const db = require('./config/keys').mongoURI;


//connection to database
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("Connected to the mongoose"))
    .catch(err => console.log(err));

//Middleware for passport
// initialize passport
app.use(passport.initialize());
app.use(passport.session());

//Configuration for passport
/* require('./config/passport')(passport); */

//body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());



app.get('/', (req, res, next) => {
    res.send('Hello World!');
});




// auth with google+
app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

// callback route for google to redirect to
// hand control to passport to use code to grab profile info
app.get('/auth/google/redirect', passport.authenticate('google'), (req, res) => {
    // res.send(req.user);
    res.send("loggedin");
});

// create home route
app.get('/', (req, res) => {
    res.send("hell oworld");
});
















app.listen(5000, () => {
	console.log("App working in port 5000");
});