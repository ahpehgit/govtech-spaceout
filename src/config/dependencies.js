const MongoDBService = require('../infrastructure/database/MongoDBService');
const AESEncryption = require('../infrastructure/security/AESEncryption');
const Jwt = require('../infrastructure/token/Jwt');

module.exports = (() => {
    return {
        DBService: new MongoDBService(),
        EncryptionService: new AESEncryption(),
        TokenService: new Jwt(),
    };
})();