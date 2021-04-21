const mongoose = require('mongoose');

const DBService = require('../../application/contracts/DBService');
const MongoCrowdLevelRepository = require('./MongoCrowdLevelRepository');
const MongoFacilityRepository = require('./MongoFacilityRepository');
const AESEncryption = require('../security/AESEncryption');

module.exports = class MongoDBService extends DBService {
    constructor() {
        super();
        this.crowdLevelRepository = new MongoCrowdLevelRepository();
        this.facilityRepository = new MongoFacilityRepository();
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

            this.crowdLevelRepository.deleteAll()
            .then(() => {
                //const timestamp = Date.parse('19 April 2021, 05:00 PM');
                //this.crowdLevelRepository.add({id: 'defc3b96e43b4714924b81117d7337f2', band: -1, createdAt: new Date(timestamp), trend: false})
            });

            this.facilityRepository.deleteAll()
            .then(() => {
                /*
                .then(async(d) => {
                    const facilities = JSON.parse(d);
                    //console.log(facilities.jsonstring.features[0]);
                    //console.log(facilities.jsonstring.features[0].geometry);
                    //console.log(facilities.jsonstring.features[0].properties);
                    const arr = facilities.jsonstring.features.map(f => f.properties);

                    await this.facilityRepository.addMany(arr);
                });
                */

                /*
                new AESEncryption().encrypt('pyRYtDWQLu83RaPCNZudQdW4WbtDdF6q', 'test encyption')
                .then(d => {
                    console.log(d);
                    return new AESEncryption().decrypt('pyRYtDWQLu83RaPCNZudQdW4WbtDdF6q', d);
                })
                .then(d => console.log(d));
                */
            });
        })
        .catch(error => {
            throw error;
        });
    }
};