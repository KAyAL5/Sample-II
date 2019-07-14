const mongoose = require('mongoose');

const organizationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    organization: String,
    phone : String,
    address : String,
    token: String
}, {
    timestamps: true
});

organizationSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('organization', organizationSchema);