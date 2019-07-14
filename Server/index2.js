'use strict';

const express = require("express");
const http = require('http');
const faye = require('faye');
const socketio = require('socket.io');

const socketEvents = require('./src/app/shared/chat.socket'); 
//const routes = require('./web/routes'); 
const userAPI = require("./src/app/routes/user.route.js");
const chatAPI = require("./src/app/routes/chat.route.js");
const roomAPI = require("./src/app/routes/room.route.js");

const appConfig = require("./src/app/config/app-config"); 

const fayeConfig = require("./src/app/shared/config"); 


class Server{

    constructor(){
        this.app = express();
        this.http = http.Server(this.app);
        this.socket = socketio(this.http);

        const bayeux = new faye.NodeAdapter({
            mount: fayeConfig.faye.mount,
            timeout: fayeConfig.faye.timeout
        });
        const server = http.createServer(this.app);
        bayeux.attach(server);
        this.app.set("newBayeux",bayeux);
    }

    appConfig(){        
        new appConfig(this.app).includeConfig();
    }

    /* Including app Routes starts*/
    includeRoutes(){
        // new routes(this.app).routesConfig();
        this.app.use('/user', userAPI);
        this.app.use('/chat', chatAPI);
        this.app.use('/room', roomAPI);
        new socketEvents(this.socket).socketConfig();
    }
    /* Including app Routes ends*/  

    appExecute(){
        this.appConfig();
        this.includeRoutes();

        const port =  process.env.PORT || 3000;
        const host = process.env.HOST || `localhost`;      

        this.http.listen(port, host, () => {
            console.log(`Listening on http://${host}:${port}`);
        });
    }

}
    
const app = new Server();
app.appExecute();