//const mongodb  = require('mongodb');
//const MongoClient = mongodb.MongoClient;
const mongoose = require('mongoose');

const DBService = require('../../application/contracts/DBService');
const MongoCrowdLevelRepository = require('./MongoCrowdLevelRepository');

module.exports = class MongoDBService extends DBService {
    constructor() {
        super();
        this.crowdLevelRepository = new MongoCrowdLevelRepository();
    }

    async initDatabase() {
        const dbName = "spaceout_db";
        const url = `mongodb://localhost:27017/${dbName}`;

        /*
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            console.log("Mongo Database created!");
            db.close();
        });
        */

        mongoose.connect(url, { useNewUrlParser: true })
        .then(() => {
            console.log("Mongo Database created!");

            /*
            mongoose.connection.db.listCollections().toArray((err, names) => {
                for (let i = 0; i < names.length; i++) {
                    console.log(names[i].name);

                    mongoose.connection.db.dropCollection(
                        "crowdlevels",
                        (err, result) => {
                            console.log("Collection dropped");
                        }
                    );
                }
            });
            */

            /*
            this.crowdLevelRepository.deleteAll()
            .then(() => {
                const timestamp = Date.parse('19 April 2021, 05:00 PM');
                this.crowdLevelRepository.add({id: 'defc3b96e43b4714924b81117d7337f2', band: -1, createdAt: new Date(timestamp), trend: false})
            })
            */
        })
        .catch(error => {
            throw error;
        });
    }
};