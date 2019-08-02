const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DirectionSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
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
    isOpen: {
        type: Boolean,
        default: true,
    },
    isAlive: {
        type: Boolean,
        default: true,
    }
},
    { timestamps: true }
);


module.exports = mongoose.model('Direction', DirectionSchema);