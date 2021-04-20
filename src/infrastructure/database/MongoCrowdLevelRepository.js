//const mongodb  = require('mongodb');
//const MongoClient = mongodb.MongoClient;
const mongoose = require('mongoose');

const CrowdRepository = require('../../application/contracts/CrowdRepository');
const CrowdLevel = require('../../entities/CrowdLevel');

const CrowdLevelSchema = new mongoose.Schema({
    id: String,
    band: Number,
    createdAt: Date,
    trend: Boolean,
});

const Model = mongoose.model('CrowdLevels', CrowdLevelSchema);

module.exports = class MongoCrowdLevelRepository extends CrowdRepository {

    constructor() {
        super();
    }

    async add(crowdObj) {
        const { id, band, createdAt, trend} = crowdObj;

        const CrowdLevel = new Model({id, band, createdAt, trend});
        await CrowdLevel.save()
        .then(() => {
            console.log('Crowd level inserted'); 
        })
        .catch(err => {
            throw err;
        });

        return new CrowdLevel(id, band, createdAt, trend);
    }

    async addMany(crowdObjs) {

        await Model.insertMany(crowdObjs)
        .then(() => {
            console.log(`${crowdObjs.length} Crowd levels inserted`); 
        })
        .catch(err => {
            throw err;
        });

        return crowdObjs.map((c) => new CrowdLevel(c.id, c.band, c.createdAt, c.trend));
    }

    async getAll(start = 0, limit = 10, filter = {}) {
        const data = await Model.find();
        return data.map((d) => {
            return new CrowdLevel(d.id, d.band, d.createdAt, d.trend);
        });
    }

    async deleteAll() {
        return await Model.deleteMany({})
        .then(() => {
            console.log('Crowd levels all deleted');
        })
        .catch(err => {
            throw err;
        });
    }
}