module.exports = class FacilityRepository {
    constructor() { }

    add(facilityObj) {
        return Promise.reject(new Error('Method not implemented'));
    }

    addMany(facilityObjs) {
        return Promise.reject(new Error('Method not implemented'));
    }

    getAll(page = 1, limit = 10, sort = '', order = 'asc', filter = {}) {
        return Promise.reject(new Error('Method not implemented'));
    }

    getAllIds() {
        return Promise.reject(new Error('Method not implemented'));
    }

    getAllByIds(ids) {
        return Promise.reject(new Error('Method not implemented'));
    }

    deleteAll() {
    	return Promise.reject(new Error('Method not implemented'));
    }
}