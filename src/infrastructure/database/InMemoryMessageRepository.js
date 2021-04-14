const MessageRepository = require('../../application/contracts/MessageRepository');

module.exports = class InMemoryMessageRepository extends MessageRepository {

    constructor() {
        super();
        this.messages = [];
    }

    async getAll() {
        return this.messages;
    }
}