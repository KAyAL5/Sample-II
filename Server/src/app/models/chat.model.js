const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
    userOrg : {type: mongoose.SchemaTypes.ObjectId, ref:'organization'},
    branch: {type: mongoose.SchemaTypes.ObjectId, ref:'branch'},
    userId: { type: String, required: true },
    messages : [{
        sender : String,
        content : String,
        date : {type: Date, default: Date.now()},
      }],
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
