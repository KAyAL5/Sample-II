const mongoose = require('mongoose');

const ChatGroup = require('../models/chatgroup.model');

const fields = {
    createdAt: false,
    updatedAt: false,
    __v: false
};

/* Create ChatGroup */
const createChatGroup = async (req, res) => {
    // Validate request
    if (!req.body.groupName) {
        return res.status(400).json({
            status: false,
            data: null,
            message: "Group name can not be empty"
        });
    }
    
    const chatgroup = new ChatGroup({
        _id: new mongoose.Types.ObjectId(),
        groupName: req.body.groupName,
        groupadmin: req.body.groupadmin
    });

    await chatgroup.save()
    .then((result) => {
        res.status(200).json({
            status: true,
            data: result
        });
    })
    .catch((err)=>{
        res.status(501).json({
            status: false,
            data: null,
            message: err
        });
    });
}

/* Get all chat group */
const getAllChatGroup = async (req, res) => {
    await ChatGroup.find({}, fields)
    .then((result) => {
        res.status(200).json({
            status: true,
            data: result,
            records: result.length,
            message: `${result.length} records found`
        });
    })
    .catch((err) =>{
        res.status(501).json({
            status: false,
            data: [],
            records: 0,
            message: err
        });
    });
}

/* Get chat group by id */
const getChatGroupById = async (req, res) => {
    console.log('Get chat group by id');
    await ChatGroup.findById(req.params.id)
        .then((result) => {
            res.status(200).json({
                status: true,
                data: result,
                message: null
            });
        })
        .catch((err) => {
            res.status(501).json({
                status: false,
                data: null,
                message: err
            });
        });
}

/* Update chat group */
const updateChatGroup = (req, res) =>{
    console.log('Update chat group');
    ChatGroup.findByIdAndUpdate(req.params.id)
    .then((result) =>{ 
        res.status(200).json({
            status: true,
            data: result
        });
    })
    .catch((err)=>{
        res.status(501).json({
            status: false,
            data:null,
            message: err
        });
    })
}

/* Delete chat group */
const deleteChatGroup =(req, res) => {
    console.log('Delete chat group');
    ChatGroup.findByIdAndRemove(req.params.id)
    .then((result)=>{
        res.status(200).json({
            status: true,
            data: result
        });
    })
    .catch((err)=>{
        res.status(501).json({
            status: false,
            data: err
        });
    });
}
  
module.exports = {
    createChatGroup,
    updateChatGroup,
    getAllChatGroup,
    getChatGroupById,
    deleteChatGroup
};