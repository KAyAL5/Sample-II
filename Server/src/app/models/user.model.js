const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: { type: String, unique: true, required: true},
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: String,
    nickname: String,
    role: String,
    verified:Boolean,
    socketId : String,
    online : Boolean,
    token: String
}, {
    timestamps: true
});

userSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('user', userSchema);
