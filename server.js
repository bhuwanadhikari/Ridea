const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');


const app = express();

//database
const db = require('./config/keys').mongoURI;


//connection to database
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("Connected to the mongoose"))
    .catch(err => console.log(err));

//Middleware for passport
app.use(passport.initialize());

//Configuration for passport
require('./config/passport')(passport);

//body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());



app.get('/', (req, res, next) => {
    res.send('Hello World!');
});

app.listen(4500, () => {
	console.log("App working in port 5000");
});