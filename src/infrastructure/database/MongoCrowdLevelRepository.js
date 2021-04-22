const mongoose = require('mongoose');

const CrowdRepository = require('../../application/contracts/CrowdRepository');
const CrowdLevel = require('../../entities/CrowdLevel');
const CrowdLevelAvgBand = require('../../entities/CrowdLevelAvgBand');

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
            console.log(`${crowdObjs.length} crowd levels inserted`); 
        })
        .catch(err => {
            throw err;
        });

        return crowdObjs.map((c) => new CrowdLevel(c.id, c.band, c.createdAt, c.trend));
    }

    async getAll(page = 1, limit = 10, sort = '', order = 'asc', filter = {}) {
        const start = (page - 1) * limit;
        const sortBy = order === 'desc'? '-'.concat(sort) : sort;
        
        const data = await Model.find(filter).sort(sortBy).skip(start).limit(limit);
        return data.map((d) => {
            return new CrowdLevel(d.id, d.band, d.createdAt, d.trend);
        });
    }

    async getAllByDateRange(start = null, end = null) {
        if (start && end) {
            const filter = { createdAt: { $gte: start, $lte: end } }
            const data = await Model.find(filter);

            return data.map((d) => new CrowdLevel(d.id, d.band, d.createdAt, d.trend));
        } else {
            return await this.getAll(1, 1000)
        }
    }

    async getAllAverageBandByDateRange(start, end) {
        let result = [];

        await Model.aggregate([{
                $match: { createdAt: { $gte: start, $lte: end } }
            },
            {
                $group: {
                    _id: "$id", 
                    averageBand: { $avg: "$band" } 
                }
            }
        ], (err, res) => {
            result = res.map(d => new CrowdLevelAvgBand(d._id, d.averageBand));
        });

        return result;
    }

    async getAllFacilityIds() {
        const data = await Model.find().select({"id": 1, "_id": 0}); //id is the facility id
        return data.map(d => d.id);
    }

    async getAllByFacilityIds(facilityIds) {
        const filter = {
            'id': { $in: facilityIds }
        };
        
        const data = await Model.find(filter).sort('-createdAt');
        return data.map((d) => new CrowdLevel(d.id, d.band, d.createdAt, d.trend));
    }

    async getAllIds() {
        const data = await Model.find().select({"id": 1, "createdAt": 1, "_id": 0}); //assume id append with createdAt to set as unique record id
        //const dictionary = data.reduce((a, x) => ({...a, [x.id + '_' + x.createdAt.getTime()]: x}), []);
        //return dictionary;
        return data.map(d => d.id + '_' + d.createdAt.getTime());
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