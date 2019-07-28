const User = require('../models/User');
const Direction = require('../models/Direction');

const matchedArr = [];
const limit = 0.6;


export const distance = (lat1, lon1, lat2, lon2) => {
    var R = 6371;
    var dLat = (lat2 - lat1) * Math.PI / 180;
    var dLon = (lon2 - lon1) * Math.PI / 180;
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    if (d > 1) return Math.round(d) + "km";
    else if (d <= 1) return Math.round(d * 1000) + "m";
    return d;
}

export const getMatchedRoute = (data, me) => {
    Direction
        .find({ $and: [{ owner: { $ne: me } }, { isOpen: true }] })
        .select('_id')
        .then((matchedRoutes) => {
            console.log(matchedRoutes, "is the matched routes");

            let cleanArray = [];
            if (matchedRoutes.length > 0) {
                matchedRoutes.forEach((routeObject) => {
                    cleanArray.push(routeObject._id);
                })
            }
            res.status(200).json(cleanArray);
        }).catch((err) => {
            console.log(err, 'in matched routes of the app');
        });
}
