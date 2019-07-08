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
    notifiedBy: [{
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        direction: { type: Schema.Types.ObjectId, ref: 'Direction' },
    }]

}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);