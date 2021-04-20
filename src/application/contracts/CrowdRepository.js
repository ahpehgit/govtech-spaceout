module.exports = class CrowdRepository {
    constructor() { }

    add(crowdObj) {
        return Promise.reject(new Error('Method not implemented'));
    }

    addMany(crowdObjs) {
        return Promise.reject(new Error('Method not implemented'));
    }

    getAll(start = 0, limit = 10, filter = {}) {
        return Promise.reject(new Error('Method not implemented'));
    }

    deleteAll() {
    	return Promise.reject(new Error('Method not implemented'));
    }
}