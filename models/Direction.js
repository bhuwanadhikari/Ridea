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
    }],
    status: {
        type: Boolean,
        default: false
    },
    requestedBy: [{
        user:{type: Schema.Types.ObjectId, ref: 'users'},
        direction: {type: Schema.Types.ObjectId, ref: 'directions'},
    }]
},
    { timestamps: true }
);

module.exports = mongoose.model('Direction', DirectionSchema);