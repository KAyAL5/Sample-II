const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const config = require('../shared/config.js');
const User = require('../models/user.model.js');
const util = require('../shared/utilites.js');

const fields = {
    createdAt: false,
    updatedAt: false,
    __v: false
};

// Create and Save a new user
async function register(req, res) {
    // Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "user can not be empty"
        });
    }

    // validate
    if (await User.findOne({ email: req.body.email })) {
        return res.status(400).send({
            message: 'email ' + req.body.email + ' is already register'
        });
    }

    // hash password
    if (req.body.password) {
        req.body.password = bcrypt.hashSync(req.body.password, 10);
    }
    // Create a user
    const user = new User({
        _id: new  mongoose.Types.ObjectId(),
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastname || "Untitled",
        nickname: firstName,
        online: false
    });

    // Save user in the database
    await user.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while saving new user."
            });
        });
};

async function authenticate(req, res) {
    // util.sendMail();
    await User.findOne({
            email: req.body.email
        }, fields)
        // .select('_Id email firstName lastName password')
        .then(user => {
            if (user && bcrypt.compareSync(req.body.password, user.password)) {
                user.online = true;
                user.save();
                // line is using javascript object destructuring to create a copy of the user object without the password property, ;
                const { password, ...userWithoutPassword } = user.toObject();
                const token = jwt.sign({ id: user.id }, config.jwt.secret, {expiresIn: config.jwt.expiration});
                // set it in an HTTP Only + Secure Cookie
                // res.cookie("SESSIONID", token, {httpOnly:true, secure:true});
                res.send({ ...userWithoutPassword, token });
            } else {
                res.status(401).send({
                    message: "Invalid email or password"
                });
            }
        }).catch(err => {
            if (err.kind === 'email') {
                return res.status(404).send({
                    message: req.body.email + " user not found"
                });
            }
            return res.status(500).send({
                message: req.body.email + " user retrieving error"
            });
        });
};

async function update(req, res) {

     // Validate request
     if (!req.body) {
        return res.status(400).send({
            message: "user can not be empty"
        });
    }

    // validate
    const user = await User.findById(req.body.id);

    if (!user) {
        return res.status(400).send({
            message: req.body.email + ' user not found'
        });
    }

    // email not match with existing users
    // ( { $and: [ { '_id': { $ne: ObjectId("5cc96ef5d08cf731d858c4fb")} }, { email: 'tovhanu@gmail.com' } ] } )
    // if (user.email !== req.body.email && await User.findOne({ $and: [ { '_id': { $ne: ObjectId("5cc96ef5d08cf731d858c4fb")} }, { email: 'tovhanu@gmail.com' } ] })) {
    //     return res.status(400).send({
    //         message: req.body.email + ' already register'
    //     });
    // }

    const userParam = {
        firstName: req.body.firstName,
        lastName: req.body.lastname || "Untitled"
    };

    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();
}

async function getUserById(userId) {
    const user = await User.findOne({ _id: userId });
    if (!user) return;
    const { password, ...userResult } = user;
    return userResult;
}

async function getAllUsers(req, res) {
    const user = await User.find({})
    .select('_Id email firstName lastName')
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

    // if (!user) return;
    // const { password, ...userResult } = user;
    // res.send({ ...userResult});
}

module.exports = {
    register,
    authenticate,
    update,
    getUserById,
    getAllUsers
};