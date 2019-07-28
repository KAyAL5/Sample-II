const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const config = require('../shared/config.js');
const Branch = require('../models/branch.model.js');
const util = require('../shared/utilites.js');

const fields = {
    createdAt: false,
    updatedAt: false,
    __v: false
};

// Create and Save a new branch
async function create(req, res) {
    // Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "branch can not be empty"
        });
    }

    // validate
    if (await Branch.findOne({ branchName: req.body.branch })) {
        return res.status(400).send({
            message: 'branch ' + req.body.branch + ' is already register'
        });
    }

    // Create a Branch
    const branch = new Branch({
        _id: new  mongoose.Types.ObjectId(),
        organizationId: req.body.organizationId,
        branchName: req.body.name,
        email: req.body.email,
        phone : req.body.phone,
        address : req.body.address
    });

    // Save Branch in the database
    await branch.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while saving new Branch."
            });
        });
};

async function update(req, res) {

     // Validate request
     if (!req.body) {
        return res.status(400).send({
            message: "Branch can not be empty"
        });
    }

    // validate
    const Branch = await Branch.findById(req.body.id);

    if (!Branch) {
        return res.status(400).send({
            message: req.body.branch + ' Branch not found'
        });
    }

    const BranchParam = {
        branchName: req.body.name,
        email: req.body.email,
        phone : req.body.phone,
        address : req.body.address
    };

    // copy BranchParam properties to Branch
    Object.assign(Branch, BranchParam);

    await Branch.save();
}

async function getBranchById(BranchId) {
    const Branch = await Branch.findOne({ _id: BranchId });
    if (!Branch) return;
    return Branch;
}

async function getAllBranchs(req, res) {
    const Branch = await Branch.find({})
    .select('_Id branchName email phone address')
    .then(result => {
        res.status(200).json({
            status: true,
            data: result,
            records: result.length,
            message: `${result.length} records found`
        });
    })
    .catch(err => {
        res.status(501).json({
            status: false,
            data: [],
            records: 0,
            message: err
        });
    });
}

async function getBranchOrganization(req, res) {
    Branch.findOne({_id: req.body.branchId}).populate('organization').exec(function(err, branch) {
        if (err) return;
        console.log('The branch is %s: ', branch.branchName);
        console.log('organization is %s: ', branch.organization.organizationName);
        res.send(branch);
    });
}

module.exports = {
    create,
    update,
    getBranchById,
    getAllBranchs,
    getBranchOrganization
};