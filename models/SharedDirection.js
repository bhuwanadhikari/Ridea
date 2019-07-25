const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SharedDirectionSchema = new Schema({
    acceptedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    acceptedTo: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    directionData = {
        type: Schema.Types.ObjectId,
        required: true
    }
});

module.exports = mongoose.model('SharedDirection', SharedDirectionSchema);