"use strict";
/*requiring mongodb node modules */
const mongodb = require('mongodb');
const assert = require('assert');

// Configuring the database
const appConfig = require('../shared/config');
const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);
mongoose.Promise = global.Promise;
 
class DB {
 
    constructor(){
        this.mongoClient = mongodb.MongoClient;
        this.ObjectID = mongodb.ObjectID;
    }
 
    onConnect(){
        //const mongoURL = process.env.DB_URL;
        // const mongoURL = 'mongodb://localhost:27017/sample'
        // return new Promise( (resolve, reject) => {
        //     this.mongoClient.connect(mongoURL, (err, client) => {
        //         if (err) {
        //             reject(err);
        //         } else {
        //             assert.equal(null, err);
        //             var db = client.db('sample');
        //             resolve([db,this.ObjectID]);
        //         }
        //     });
        // });

        // Connecting to the database
       return mongoose.connect(appConfig.dbCon, {
            useNewUrlParser: true
        }).then((db) => {
            console.log(db);
            console.log("Successfully connected to the database");    
        }).catch(err => {
            console.log('Could not connect to the database. Exiting now...', err);
            process.exit();
        });
    }
}
module.exports = new DB();