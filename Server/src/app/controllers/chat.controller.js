const faye = require('faye');
// var http  = require('http');

const chat = require('../models/chat.model');
const appConfig = require('../shared/config');

// const bayeux = exports.bayeux = new faye.NodeAdapter({
//     mount: appConfig.faye.mount,
//     timeout: appConfig.faye.timeout
// });

// var server = http.createServer(app);

// app.post('/message', function(req, res) {
//     bayeux.getClient().publish('/channel', {text: req.body.message});
//     res.send(200);
// });
const current_datetime = new Date()
const formatted_date = current_datetime.getDate() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getFullYear() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds() ;
    

function chatMessage(req, res) {
    const bayeux = req.app.get("newBayeux");
  //  bayeux.getClient().publish('/channel', {text: req.body.message});
    // res.send(200);

        try {
            // generate token
        //    const token = jwt.sign({ email: user.email },appConfig.jwt.secret, { expiresIn: appConfig.jwt.expiration });
            const publication = bayeux.getClient().publish('/channel', {
                message: req.body.message,
                token: 'jwt_token'
            });
            publication.then(function () {
            }, function (error) {
                console.log("error coming up:" + error);
            });
           // res.send(200);
        } catch (e) {
            console.log("error" + e);
        }
}

function getuser(req, res){
    res.send({data:'call getuser'});
}

function listemessagesuser(req, res){
    res.status(200).json({
        status: true,
        message:'auto call listemessagesuser',
        format_message:'texte',
        token: req.body.token,
        date_envoi: formatted_date
    });
}

function listemessagesroom (req, res){
    res.send({message:[{message:"msg 1 room"}, {message:"msg 2 room"},{message:"msg 3 room"}], errorCode: true });
}

function listemessagesgroup(req,res) {
    res.send({message: [{message:"msg gr 1"}, {message:"msg gr 2"},{message:"msg gr 3"}], errorCode: true });
}

function envoimessageuser(req, res){
    // res.send({data:'call envoimessageuser'});
    res.status(200).json({
        status: true,
        message:req.body.message,
        format_message:'texte',
        date_envoi: formatted_date,
        pseudo: 'pseudo',
        token: req.body.token
    });
}

function envoifileuser(req, res){
    res.send({data:'call envoifileuser'});
}

function onUploadfile(req, res){
    res.send({data:'call onUploadfile'});
}

function showfile(req, res){
    res.send({data:'call showfile'});
}


module.exports = {chatMessage,
    getuser, listemessagesuser, envoimessageuser, 
    listemessagesgroup, 
    listemessagesroom,
    envoifileuser, onUploadfile, showfile
};