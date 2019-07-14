const mongoose = require('mongoose');

const roomSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    roomName: String
}, {
    timestamps: true
});

roomSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('room', roomSchema);