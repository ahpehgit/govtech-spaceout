const InMemoryDBService = require('../infrastructure/database/InMemoryDBService');
const AESEncryption = require('../infrastructure/security/AESEncryption');

module.exports = (() => {
    return {
        DBService: new InMemoryDBService(),
        EncryptionService: new AESEncryption(),
    };
})();