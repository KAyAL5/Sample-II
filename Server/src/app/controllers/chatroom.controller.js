const mongoose = require('mongoose');

const ChatRoom = require('../models/chatroom.model.js');

/* Save room chat */
const message = async (req, res) => {
    // Validate request
    if (!req.body) {
        return res.status(400).json({
            status: false,
            data: null,
            message: "Request param not error"
        });
    }
    const chatroom = new ChatRoom({
        _id: new  mongoose.Types.ObjectId(),
        roomName: req.body.roomId,
        nickname: req.body.nickname,
        message: req.body.msg,
    });

    await chatroom.save()
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

/* Get all rooms */
const getallmessage = async (req, res) => {
    await ChatRoom.find({})
    .then((result) =>{
        res.status(200).json({
            status: "success",
            data: result
        });
    })
    .catch((err) =>{
        res.status(501).json({
            status: "failed",
            message: err
        });
    });
}

/* Get room by id */
const getmessage = async (req, res) => {
    await ChatRoom.findById(req.params.id)
        .then((result) => {
            res.status(200).json({
                status: true,
                data: result,
                message: ""
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

/* Update room */
const updateroommessage = (req, res) =>{
    ChatRoom.findByIdAndUpdate(req.params.id)
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

/* Delete ChatRoom */
const deleteroommessage =(req, res) => {
    ChatRoom.findByIdAndRemove(req.params.id)
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
    message,
    updateroommessage,
    getallmessage,
    getmessage,
    deleteroommessage
};