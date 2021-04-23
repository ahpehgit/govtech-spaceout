const MongoDBService = require('../infrastructure/database/MongoDBService');
const AESEncryption = require('../infrastructure/security/AESEncryption');

module.exports = (() => {
    return {
        DBService: new MongoDBService(),
        EncryptionService: new AESEncryption(),
    };
})();