const mongoose = require('mongoose');

const config = require('../shared/config.js');
const Room = require('../models/room.model.js');
const util = require('../shared/utilites.js');

const fields = {
    createdAt: false,
    updatedAt: false,
    __v: false
};

/* Create Room */
const createRoom = async (req, res) => {
    // Validate request
    if (!req.body.roomName) {
        return res.status(400).json({
            status: false,
            data: null,
            message: "Room name can not be empty"
        });
    }
    const room = new Room({
        _id: new  mongoose.Types.ObjectId(),
        roomName: req.body.roomName
    });

    await room.save()
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
const getAllRooms = async (req, res) => {
    await Room.find({}, fields)
    .then((result) => {
        res.status(200).json({
            status: true,
            data: result,
            message: result.length
        });
    })
    .catch((err) =>{
        res.status(501).json({
            status: false,
            data: [],
            message: err
        });
    });
}

/* Get Room by id */
const getRoomById = async (req, res) => {
    await Room.findById(req.params.id)
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
const updateRoom = (req, res) =>{
    Room.findByIdAndUpdate(req.params.id)
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

/* Delete Room */
const deleteRoom =(req, res) => {
    Room.findByIdAndRemove(req.params.id)
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
    createRoom,
    updateRoom,
    getAllRooms,
    getRoomById,
    deleteRoom
};