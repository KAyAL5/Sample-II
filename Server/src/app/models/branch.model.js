const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');

const branchSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    organization: { type: mongoose.Schema.Types.ObjectId, ref: 'organization', required: true},
    branchName: String,
    email: String,
    phone : String,
    address : String,
    token: String
}, {
    timestamps: true
});

branchSchema.plugin(idValidator);
//branchSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('branch', branchSchema);

// branch.findOne({_id: 'xxxxxxx'}).populate('organization', 'organization phone').exec(function(err, branch) {
//     console.log('branch title: ', branch.branchName);
//     console.log('branch org', branch.organization.organization);
//   });