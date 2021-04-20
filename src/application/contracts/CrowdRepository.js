module.exports = class CrowdRepository {
    constructor() { }

    add(crowdObj) {
        return Promise.reject(new Error('Method not implemented'));
    }

    addMany(crowdObjs) {
        return Promise.reject(new Error('Method not implemented'));
    }

    getAll(page = 1, limit = 10, sort = '', order = 'asc', filter = {}) {
        return Promise.reject(new Error('Method not implemented'));
    }

    deleteAll() {
    	return Promise.reject(new Error('Method not implemented'));
    }
}