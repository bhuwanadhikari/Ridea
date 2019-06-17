const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

const auth = require('./api/auth');


const app = express();



//connection to database
const db = require('./config/keys').mongoURI;
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("Connected to the mongoose"))
    .catch(err => console.log(err));

//Middleware for passport
// initialize passport
app.use(passport.initialize());
app.use(passport.session());

//Passport config
require('./config/passport')(passport);

//Configuration for passport

//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.get('/', (req, res, next) => {
    res.send('Hello World!');
});


// //Setting up of routes
app.use('/auth', auth);



app.listen(5000, () => {
    console.log("App working in port 5000");
});