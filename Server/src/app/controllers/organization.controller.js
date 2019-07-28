const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const config = require('../shared/config.js');
const Organization = require('../models/organization.model.js');

const fields = {
    createdAt: false,
    updatedAt: false,
    __v: false
};

// Create and Save a new Org
async function create(req, res) {
    // Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "Organization can not be empty"
        });
    }

    // validate
    if (await Organization.findOne({ organizationName: req.body.name })) {
        return res.status(400).send({
            message: 'Organization ' + req.body.name + ' is already register'
        });
    }

    // Create a Organization
    const organization = new Organization({
        _id: new  mongoose.Types.ObjectId(),
        organizationName: req.body.name,
        phone : req.body.phone,
        address : req.body.address,
        logo : req.body.logo,
        website : req.body.website
    });

    // Save Organization in the database
    await organization.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while saving new organization."
            });
        });
};

async function update(req, res) {

     // Validate request
     if (!req.body) {
        return res.status(400).send({
            message: "Organization can not be empty"
        });
    }

    // validate
    const organization = await Organization.findById(req.body.id);

    if (!organization) {
        return res.status(400).send({
            message: req.body.name + ' Organization not found'
        });
    }

    const OrganizationParam = {
        organizationName: req.body.name,
        email: req.body.email,
        phone : req.body.phone,
        address : req.body.address
    };

    // copy OrganizationParam properties to Organization
    Object.assign(Organization, OrganizationParam);

    await Organization.save();
}

async function getOrganizationById(organizationId) {
    const organization = await Organization.findOne({ _id: organizationId });
    if (!organization) return;
    return organization;
}

async function getAllOrganizations(req, res) {
    const organization = await Organization.find({})
    .select('_Id organization email phone address')
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

module.exports = {
    create,
    update,
    getOrganizationById,
    getAllOrganizations
};