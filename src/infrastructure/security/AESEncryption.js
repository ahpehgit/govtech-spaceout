const {
  randomBytes,
  createCipheriv,
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

    async encrypt(plaintext) {
        return new Promise((resolve, reject) => {
            const iv = randomBytes(16); // Generate random 16 byte IV
            try {
                const cipher = createCipheriv(this.algorithm, process.env.ENCRYPTION_KEY, iv);
                let encrypted = cipher.update(plaintext, 'utf8', 'hex');

                encrypted += cipher.final('hex');
                const en = (Buffer.from(iv).toString('hex') + ':' + encrypted);
                return resolve(en);
            }
            catch(err) {
                return reject(err);
            }   
        });
    }

    async decrypt(encrypted) {
        return new Promise((resolve, reject) => {
            const cipher = encrypted.split(':');
            const iv = Buffer.from(cipher[0], 'hex');
            
            try {
                const decipher = createDecipheriv(this.algorithm, process.env.ENCRYPTION_KEY, iv);
                let decrypted = decipher.update(cipher[1], 'hex', 'utf8');
                decrypted += decipher.final('utf8');
                return resolve(decrypted);
            }
            catch(err) {
                return reject(err);
            }
        });
    }
}