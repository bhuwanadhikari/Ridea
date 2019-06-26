const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');


const auth = require('./api/auth');
const directions = require('./api/directions');
const app = express();
app.use(cors());

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


// //Setting up of routes
app.use('/auth', auth);
app.use('/directions', directions);

if (process.env.NODE_ENV === 'production') {
    //set static folder
    app.use(express.static('frontend/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    });
}


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running in port ${port}`));