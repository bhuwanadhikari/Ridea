const router = require("express").Router()
const Direction = require("../models/Direction")
const passport = require('passport');

router.post('/calc-fare', passport.authenticate('jwt', { session: false }), async (req, res) => {

    const totalFare = req.body.totalFare;
    const him = req.body.him;

    console.log("total fare is", totalFare);

    var hisDistance, myDistance;

    await (async () => {
        await Direction
            .findOne({ owner: req.user.id })
            .then(my => {
                myDistance = my.directionData.routes[0].legs[0].distance.value;
            })
            .catch(err => console.log('Error in my fare wala', err));

        await Direction
            .findOne({ owner: him })
            .then(his => {
                hisDistance = his.directionData.routes[0].legs[0].distance.value;
            })
            .catch(err => console.log('Error in my fare wala', err));
    }
    )();


    let hisFare = totalFare * hisDistance / (hisDistance + myDistance);
    let myFare = totalFare * myDistance / (hisDistance + myDistance);

    hisFare = Math.round(hisFare/10)*10;
    myFare = Math.round(myFare/10)*10;

    
    console.log("his and my fare are", hisFare, myFare)

    res.status(200).json({ hisFare, myFare });
});


module.exports = router;

