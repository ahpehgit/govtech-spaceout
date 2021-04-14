const GetMessages = require('../application/use_cases/GetMessages');

module.exports = (dependencies) => {

    const { messageRepository } = dependencies.DBService;

    const getMessages = (req, res, next) => {

        const query = GetMessages(messageRepository);

        query.Execute().then((data) => {
            res.json(data);
        }, (err) => {
            next(err);
        });
    };

    return {
        getMessages
    };
}