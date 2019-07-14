const mongoose = require('mongoose');

const chatroomSchema = mongoose.Schema({
 _id: mongoose.Schema.Types.ObjectId,
  room : { type: Schema.Types.ObjectId, ref: 'Room' },
  nickname: String,
  message: String,
  created_date: { type: Date, default: Date.now },
});

chatroomSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('chatroom', chatroomSchema);
