const InMemoryDBService = require('../infrastructure/database/InMemoryDBService');

module.exports = (() => {
    return {
        DBService: new InMemoryDBService(),
    };
})();