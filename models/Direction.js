const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const DirectionSchema = new Schema({
    directionData: Object
}, {timestamps: true});

module.exports = mongoose.model('Direction', DirectionSchema);