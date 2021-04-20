module.exports = class EncryptionService {
    constructor() { }

    encrypt(secretKey, plaintext) {
        return Promise.reject(new Error('Method not implemented'));
    }
    
    decrypt(secretKey, encrypted) {
        return Promise.reject(new Error('Method not implemented'));
    }
}