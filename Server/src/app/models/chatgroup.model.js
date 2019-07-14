const mongoose = require('mongoose');

const chatGroupSchema = mongoose.Schema({
    _Id: mongoose.Schema.Types.ObjectId,
    groupName: { type: String, required: true },
    groupadmin:{ type: String, required: true },
}, {
    timestamps: true
});

chatGroupSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('chatgroup', chatGroupSchema);