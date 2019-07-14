const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const http  = require('http');
const faye = require('faye');

const jwt = require('./src/app/shared/jwt');
const errorHandler = require('./src/app/shared/error-handler');
const socketEvents = require('./src/app/shared/chat.socket');

// An instance of express store it into app variable
const app = express();

// Import routes
const userAPI = require("./src/app/routes/user.route.js");
const chatAPI = require("./src/app/routes/chat.route.js");
const roomAPI = require("./src/app/routes/room.route.js");
const chatgroupAPI = require('./src/app/routes/chatgroup.route.js');

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
// app.use(jwt());

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      return res.status(403).send({
        success: false,
        message: 'Access denied for user'
      });
    }
  });

// console.log(process.env.NODE_ENV);
// const http = require('http').Server(app);
// const io = require('socket.io')(http);
// ================faya plan to move chat controller====================
// Create server with http module and pass express to http.Server()
// Express will serve as the handler for requests to our server.
// In return we get the instance of server which we store in server variable.
var server = http.createServer(app);

//======================= socket io=======================
// const socketio = require('socket.io')(http);
const io = require('socket.io')(server, {origins:'localhost:*'});
new socketEvents(io).socketConfig();

//=======================socket io========================
const bayeux = new faye.NodeAdapter({
    mount: appConfig.faye.mount,
    timeout: appConfig.faye.timeout
});

// var bayeux = new faye.NodeAdapter({
//         mount: '/bayeux',
//         timeout: 20,
//         engine: {
//             type: redis,
//             host: "192.168.0.10",
//             port: "6379",
//             namespace: "faye-redis-PoC:"
//         }
//     });

// var Logger = {
// 	incoming: function(message, callback) {
// 		console.log(message);
// 		console.log('====================');
// 		callback(message);
// 	}
// };
// bayeux.addExtension(Logger);

// bayeux.bind('publish',function(clientId, channel, data) {
//     console.log('Publish = ' + channel + ' : ' + data.text);
// });
  
// bayeux.bind('subscribe', function(clientId, channel){
//     console.log('Subscriber: ' + clientId + ' - ' + channel);
//     bayeux.getClient().publish('/channel', {
//         text: 'Sample text message'});
// });

bayeux.attach(server);

app.set("newBayeux",bayeux);

// app.post('/chat/message', function (req, res) {
//     try {
//         // generate token
//        // const token = jwt.sign({ email: user.email },appConfig.jwt.secret, { expiresIn: appConfig.jwt.expiration });
//         const publication = bayeux.getClient().publish('/channel', {
//             text: req.body.message,
//             userId: req.body.userId,
//             token: 'jwt_token'
//         });
//         publication.then(function () {
//             console.log("Message recieved by server");
//         }, function (error) {
//             console.log("error coming up:" + error);
//         });
//         console.log("Posting message:" + req.body.message);
//         res.send(200);
//     } catch (e) {
//         console.log("error" + e);
//     }
// });

// ===========================end=======================================
app.use('/user', userAPI);
app.use('/chat', chatAPI);
app.use('/room', roomAPI);
app.use('/chatgroup', chatgroupAPI);

// set error handler
// app.use(errorHandler);

// listen for requests
server.listen(3000, () => {
    console.log("Server is listening on port 3000");
});

//Error catch
process.on('uncaughtException', function (err) {
    console.log('[' + new Date() + '][Error] ' + err.stack);
});
// run in dev => npm run serve

// bayeux.bind('disconnect', function(clientId) {
//     // event listener logic
// });
  
//   client.bind('transport:down', function() {
//     // Fires when the connection is lost
//   });
//   client.bind('transport:up', function() {
//     // Fires when the connection is established
//   });
