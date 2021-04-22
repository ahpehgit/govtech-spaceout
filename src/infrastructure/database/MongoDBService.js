const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const DBService = require('../../application/contracts/DBService');
const MongoCrowdLevelRepository = require('./MongoCrowdLevelRepository');
const MongoFacilityRepository = require('./MongoFacilityRepository');
const MongoAuthorisedUserRepository = require('./MongoAuthorisedUserRepository');

module.exports = class MongoDBService extends DBService {
    constructor() {
        super();
        this.crowdLevelRepository = new MongoCrowdLevelRepository();
        this.facilityRepository = new MongoFacilityRepository();
        this.authorisedUserRepository = new MongoAuthorisedUserRepository()
    }

    async initDatabase() {
        const dbName = "spaceout_db";
        const url = `mongodb://localhost:27017/${dbName}`;

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
            const promise1 = this.crowdLevelRepository.deleteAll()
            .then(() => {
                //const timestamp = Date.parse('19 April 2021, 05:00 PM');
                //this.crowdLevelRepository.add({id: 'defc3b96e43b4714924b81117d7337f2', band: -1, createdAt: new Date(timestamp), trend: false})
            });

            const promise2 = this.facilityRepository.deleteAll()
            .then(() => {
            });

            const promise3 = this.authorisedUserRepository.deleteAll()
            .then(() => {
            });

            Promise.all([promise1, promise2, promise3])
            .then(async () => {
                //* Insert sample user 'admin' to use for login later
                const saltRounds = 10;
                const hash = bcrypt.hashSync('somepassword', saltRounds);
                this.authorisedUserRepository.add({name: 'admin', password: hash});
            })
            */
        })
        .catch(error => {
            throw error;
        });
    }
};