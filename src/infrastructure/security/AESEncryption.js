const {
  scrypt,
  randomFill,
  createCipheriv,
  scryptSync,
  createDecipheriv
} = require('crypto');

const EncryptionService = require('../../application/contracts/EncryptionService');

module.exports = class AESEncryption extends EncryptionService {
	constructor() {
        super();

        // The key length is dependent on the algorithm.
        // In this case for AES256, it is 32 bytes (256 bits).
        this.keyLength = 32;
        this.algorithm = 'aes-256-cbc';
    }

    async decrypt(secretKey, encrypted) {
        return new Promise((resolve, reject) => {
            const cipher = encrypted.split(':');
            const iv = Buffer.from(cipher[0], 'hex');
            
            try {
                const decipher = createDecipheriv(this.algorithm, secretKey, iv);
                let decrypted = decipher.update(cipher[1], 'hex', 'utf8');
                decrypted += decipher.final('utf8');
                return resolve(decrypted);
            }
            catch(err) {
                return reject(err);
            }
        });
    }

    /*
    async decrypt(secretKey, encrypted) {

        // Decrypt with fixed salt
        const key = scryptSync(secretKey, 'salt', this.keyLength);
        return new Promise((resolve, reject) => {
            const cipher = encrypted.split('.');
            const iv = Buffer.from(cipher[0], 'hex');
            
            try {
                const decipher = createDecipheriv(this.algorithm, key, iv);
                let decrypted = decipher.update(cipher[1], 'hex', 'utf8');
                decrypted += decipher.final('utf8');
                return resolve(decrypted);
            }
            catch(err) {
                return reject(err);
            }
        });
    }
    */
}