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
        const url = `mongodb://${process.env.MONGO_HOSTNAME}:27017/${dbName}`; //mongoserver is service name of mongo in dockers

        return setTimeout(() => {
            return mongoose.connect(url, { useNewUrlParser: true })
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

                const promise1 = this.crowdLevelRepository.deleteAll();
                const promise2 = this.facilityRepository.deleteAll();
                const promise3 = this.authorisedUserRepository.deleteAll();

                Promise.all([promise1, promise2, promise3])
                .then(async () => {
                    //* Insert sample user 'admin' to use for login later
                    const saltRounds = 10;
                    const hash = bcrypt.hashSync('somepassword', saltRounds);
                    this.authorisedUserRepository.add({name: 'admin', password: hash});
                });
            })
            .catch(error => {
                throw error;
            });
        }, 20000); //delay 20 seconds to let mongo server to get ready
    }
};