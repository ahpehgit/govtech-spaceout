const mongoose = require('mongoose');

const FacilityRepository = require('../../application/contracts/FacilityRepository');
const Facility = require('../../entities/Facility');

const FacilitySchema = new mongoose.Schema({
    ID: String,
    NAME: String,
    TYPE: String,
    CENTER: String,
    ADDRESS: String,
    BLK_HOUSE: String,
    ROAD_NAME: String,
    OTHER_NAME: String,
    POSTALCODE: String,
});

const Model = mongoose.model('Facilities', FacilitySchema);

module.exports = class MongoFacilityRepository extends FacilityRepository {

    constructor() {
        super();
    }

    async add(facilityObj) {
        const { ID, NAME, TYPE, CENTER, ADDRESS, BLK_HOUSE, ROAD_NAME, OTHER_NAME, POSTALCODE } = facilityObj;

        const model = new Model({ ID, NAME, TYPE, CENTER, ADDRESS, BLK_HOUSE, ROAD_NAME, OTHER_NAME, POSTALCODE });
        await model.save()
        .then(() => {
            console.log('Facility inserted'); 
        })
        .catch(err => {
            throw err;
        });

        return new Facility(ID, NAME, TYPE, CENTER, ADDRESS, BLK_HOUSE, ROAD_NAME, OTHER_NAME, POSTALCODE);
    }

    async addMany(facilityObjs) {

        await Model.insertMany(facilityObjs)
        .then(() => {
            console.log(`${facilityObjs.length} facilities inserted`); 
        })
        .catch(err => {
            throw err;
        });

        return facilityObjs.map((d) => new Facility(d.ID, d.NAME, d.TYPE, d.CENTER, d.ADDRESS, d.BLK_HOUSE, d.ROAD_NAME, d.OTHER_NAME, d.POSTALCODE));
    }

    async getAll(page = 1, limit = 10, sort = '', order = 'asc', filter = {}) {
        const start = (page - 1) * limit;
        const sortBy = order === 'desc'? '-'.concat(sort) : sort;

        //filter = {band: {$eq: -2}
        
        const data = await Model.find(filter).sort(sortBy).skip(start).limit(limit);
        return data.map((d) => {
            return new Facility(d.ID, d.NAME, d.TYPE, d.CENTER, d.ADDRESS, d.BLK_HOUSE, d.ROAD_NAME, d.OTHER_NAME, d.POSTALCODE);
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