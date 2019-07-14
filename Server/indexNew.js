const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const faye = require('faye');

var currentRooms = {
    room : [],
    ownerId : []
};

var currentMessages = {
    userId : [],
    room : [],
    data : []
};

const jwt = require('./src/app/shared/jwt');

// create express app
const app = express();

setInterval(function(){sendData()},5000);

// Import routes
const userAPI = require("./src/app/routes/user.route.js");
const chatAPI = require("./src/app/routes/chat.route.js");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.use(cors({ origin:'http://localhost:4200' }));

// Configuring the database
const appConfig = require('./src/app/shared/config.js');
const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(appConfig.dbCon, {
	useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    // res.json({"message": "Sample application Server Running"});
    res.sendfile('./src/public/client.html');
});

// use JWT auth to secure the api
//  app.use(jwt());

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      return res.status(403).send({
        success: false,
        message: 'No token provided.'
      });
    }
  });

// ================faya plan to move chat controller====================
// var http  = require('http');
// var server = http.createServer();

app.get("/chatroom", function() {
    console.log("in chatroom");
});

var bayeux = new faye.NodeAdapter({
    mount: '/faye',
    timeout: 45
});

bayeux.bind('handshake', function(clientId) {
  console.log("handshake " + clientId);
});

bayeux.bind('subscribe', function(clientId, channel) {   
  console.log("subscribed " + clientId + " in channel " + channel);
});

bayeux.bind('unsubscribed', function(clientId, channel) {
  console.log("unsubscribed " + clientId +  " from channel " + channel);
});

bayeux.bind('publish', function(clientId, channel, data) {
  console.log("publish " + clientId +  " in channel " + channel + " with data " + data.text);
  console.log("currentRoomLength " + currentRooms.room.length)
  var found = false;
    for(var i = 0; i < currentRooms.room.length; i++) {
        console.log(i);
        console.log(currentRooms.room[i]);
        if (currentRooms.room[i] == channel) {
            found = true;
            console.log("Herbergi fannst");
        }
    }     
    if (found == false) {
        if(channel !== '/123datachannel321') {
            currentRooms.room.push(channel);
            currentRooms.ownerId.push(clientId);
            console.log("channel added to server");
        }

    }
    if(channel !== '/123datachannel321') {
        currentMessages.userId.push(clientId);
        currentMessages.room.push(channel);
        currentMessages.data.push(data);
    }

});

bayeux.bind('disconnect', function(clientId) {
  console.log("disconnect " + clientId);
});

//bayeux.addExtension(inExtension);
// bayeux.attach(8001);
console.log("Bayeux server listening on localhost:8001");
bayeux.attach(app);

// ===========================end=======================================
app.use('/user', userAPI);
// app.use('/chat', chatAPI);

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});

//Error catch
process.on('uncaughtException', function (err) {
    console.log('[' + new Date() + '][Error] ' + err.stack);
});
// run in dev => npm run serve

/////////////////////Test/////////////
var client = new faye.Client('http://localhost:8001/faye');
function sendData() {

    var publication = client.publish('/123datachannel321', {
        rooms : currentRooms.room,
        roomOwner : currentRooms.ownerId,
        messageData : currentMessages.data,
        messageUserId : currentMessages.userId,
        messageRoom : currentMessages.room
    });
}
