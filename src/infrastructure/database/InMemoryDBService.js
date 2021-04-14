const DBService = require('../../application/contracts/DBService');
const InMemoryMessageRepository = require('./InMemoryMessageRepository');
const Models = require('../../models');

module.exports = class InMemoryDBService extends DBService {
    constructor() {
        super();
        this.messageRepository = new InMemoryMessageRepository();
    }

    async initDatabase() {
        this.seedData();
    }

    async seedData() {
        console.log(Models.messages);
        this.messageRepository.messages = Models.messages;
    }
};
