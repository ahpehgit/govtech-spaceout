/* eslint-disable class-methods-use-this */
module.exports = class DBService {

    constructor() {
        this.facilityRepository = null;
        this.crowdLevelRepository = null;
        this.authorisedUserRepository = null;
    }

    initDatabase() {
        return Promise.reject(new Error('Method not implemented'));
    }
};