const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
    },
    username: {
        type: String,
    },
    googleId: {
        type: String,
    },
    thumbnail: {
        type: String,
    },


    requestedTo: [{
        type: Schema.Types.ObjectId, ref: 'User'
    }],
    requestedBy: [{
        type: Schema.Types.ObjectId, ref: 'User'
    }],


    acceptedTo: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    acceptedBy: {
        type: Schema.Types.ObjectId, ref: 'User'
    },


    rejectedTo: [{
        type: Schema.Types.ObjectId, ref: 'User'
    }],
    rejectedBy: [{
        type: Schema.Types.ObjectId, ref: 'User'
    }],

    
    status: {
        type: Boolean,
        default: false
    },

}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);