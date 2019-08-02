const User = require('../models/User');
const Direction = require('../models/Direction');

const matchedArr = [];
const limit = 0.6;


const distance = (lat1, lon1, lat2, lon2) => {
    var R = 6371;
    var dLat = (lat2 - lat1) * Math.PI / 180;
    var dLon = (lon2 - lon1) * Math.PI / 180;
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    d = d * 1000;
    d = d.toFixed(2);
    return d;
}

const getMatchedRoute = async (req, res) => {
    const data = req.body, me = req.user.id;

    const myPath = data.directionData.routes[0].overview_path;
    const mySeats = data.rideData.seatsCount;
    const iwait4 = data.rideData.waitFor * 1000 * 60;
    const myPickupTime = data.rideData.pickupTime;
    const myPickupLimit = iwait4 + myPickupTime;

    // console.log("My route path length is:", myPath.length);
    // console.log("Requested Body is given as", myRoute);
    await Direction
        .find({
            $and: [
                { owner: { $ne: me } },
                { isOpen: true }]
        })
        // .select('_id')
        .then(async (candidateRoutes) => {


            let cleanArray = [];

            var bySeatsArr = [], byTimeArr = [], pureArr = [];

            for (let candidate of candidateRoutes) {
                //Filter by seat counts
                const hisSeats = candidate.rideData.seatsCount;
                if (mySeats + hisSeats <= 3) {
                    bySeatsArr.push(candidate._id);
                }


                //Find the match according to the  time limit:
                const heWait4 = candidate.rideData.waitFor * 60 * 1000;
                const hisPickupTime = candidate.rideData.pickupTime;
                const hisPickupLimit = heWait4 + hisPickupTime;

                if (myPickupTime < hisPickupLimit && hisPickupTime < myPickupLimit) {
                    byTimeArr.push(candidate._id);
                }



                // Find out the match according to the overlapping
                const hisPath = candidate.directionData.routes[0].overview_path;
                // console.log("His route length is", hisPath.length);

                var distanceList = [];

                const myLength = myPath.length;
                const hisLength = hisPath.length;
                var count = 0;

                for (let i = 0; i < myLength; i = i + 10) {
                    for (let j = 0; j < hisLength; j = j + 1) {

                        count++;

                        const myPoint = myPath[i];
                        const hisPoint = hisPath[j];

                        // console.log('His point are:', hisPoint);

                        var d = distance(myPoint.lat, myPoint.lng, hisPoint.lat, hisPoint.lng);
                        d = parseFloat(d);

                        distanceList.push(d)


                    }
                }



                distanceList = distanceList.filter(el => el < 100);
                if (distanceList.length > 1) {
                    // console.log(distanceList);
                    cleanArray.push(candidate._id);
                }
            }

            pureArr = bySeatsArr.filter(candi => {
                return byTimeArr.includes(candi);
            });

            pureArr = pureArr.filter(candi => {
                return cleanArray.includes(candi);
            })

            console.log('By Time is', byTimeArr);
            console.log('By route is', cleanArray);
            console.log('By seats is', bySeatsArr);
            res.status(200).json(pureArr);
        }).catch((err) => {
            console.log(err, 'in matched routes of the app');
        });
}


module.exports = {
    getMatchedRoute
}

