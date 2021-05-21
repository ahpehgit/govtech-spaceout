const mongoose = require('mongoose');

const FacilityRepository = require('../../application/contracts/FacilityRepository');
const Facility = require('../../entities/Facility');

const FacilitySchema = new mongoose.Schema({
    id: String,
    name: String,
    type: String,
    center: String,
    address: String,
    blk_house: String,
    road_name: String,
    other_name: String,
    postalCode: String,
});

const Model = mongoose.model('Facilities', FacilitySchema);

module.exports = class MongoFacilityRepository extends FacilityRepository {

    constructor() {
        super();
    }

    async add(facilityObj) {
        const { id, name, type, center, address, blk_house, road_name, other_name, postalCode } = facilityObj;

        const model = new Model({ id, name, type, center, address, blk_house, road_name, other_name, postalCode });
        await model.save()
        .then(() => {
            console.log('Facility inserted'); 
        })
        .catch(err => {
            throw err;
        });

        return facilityObj;
    }

    async addMany(facilityObjs) {

        await Model.insertMany(facilityObjs)
        .then(() => {
            console.log(`${facilityObjs.length} facilities inserted`); 
        })
        .catch(err => {
            throw err;
        });

        return facilityObjs.map((d) => new Facility(d.id, d.name, d.type, d.center, d.address, d.blk_house, d.road_name, d.other_name, d.postalCode));
    }

    async getAll(page = 1, limit = 10, sort = '', order = 'asc', filter = {}) {
        const start = (page - 1) * limit;
        const sortBy = order === 'desc' ? '-'.concat(sort.toLowerCase()) : sort.toLowerCase();

        //filter = {NAME: {$regex: 'AN'}}
        let f = {};
        for (let key in filter) {
            f = {...f, [key]: new RegExp(filter[key])}
        }
        const data = await Model.find(f).sort(sortBy).skip(start).limit(limit);
        return data.map((d) => {
            return new Facility(d.id, d.name, d.type, d.center, d.address, d.blk_house, d.road_name, d.other_name, d.postalCode);
        });
    }

    async getAllIds() {
        const data = await Model.find().select({"id": 1, "_id": 0}); // discard internal mongodb id
        return data.map(d => d.id);
    }

    async getAllByIds(ids) {
        const filter = {
            'id': { $in: ids }
        };
        
        const data = await Model.find(filter);
        return data.map((d) => {
            return new Facility(d.id, d.name, d.type, d.center, d.address, d.blk_house, d.road_name, d.other_name, d.postalCode);
        });
    }

    async deleteAll() {
        return await Model.deleteMany({})
        .then(() => {
            console.log('Facilities all deleted');
        })
        .catch(err => {
            throw err;
        });
    }
}