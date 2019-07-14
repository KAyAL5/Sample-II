const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
    userId: { type: String, required: true },
    contain: { type: String, required: true }
}, {
    timestamps: true
});

chatSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('chat', chatSchema);

// var chatSchema = new mongoose.Schema({
//   room : { type: Schema.Types.ObjectId, ref: 'Room' },
//   nickname: String,
//   message: String,
//   created_date: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model('chat', chatSchema);
