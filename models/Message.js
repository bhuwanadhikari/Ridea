const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    ownerName: { type: String, required: true },
    from: { type: Schema.Types.ObjectId, required: true },
    to: { type: Schema.Types.ObjectId, required: true },
    body: { type: String, required: true },
}, { timestamps: { createdAt: true, updatedAt: false } });

module.exports = mongoose.model('Message', MessageSchema);