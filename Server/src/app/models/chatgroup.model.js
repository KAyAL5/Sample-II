const mongoose = require('mongoose');

const chatGroupSchema = mongoose.Schema({
    _Id: mongoose.Schema.Types.ObjectId,
    groupName: { type: String, required: true },
    groupadmin:{ type: String, required: true },
    groupmembers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }]
}, {
    timestamps: true
});

chatGroupSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('chatgroup', chatGroupSchema);

//groupmembers=>set to an array of ObjectIds