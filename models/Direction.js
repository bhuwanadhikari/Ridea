const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DirectionSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    directionData: {
        type: Object,
        required: true,
    },
    rideData: {
        type: Object,
        required: true,
    },
    selectedRoutes: [{
        type: Object
    }]
},
    { timestamps: true }
);

module.exports = mongoose.model('Direction', DirectionSchema);