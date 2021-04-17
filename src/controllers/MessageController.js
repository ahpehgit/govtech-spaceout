const GetMessages = require('../application/use_cases/GetMessages');

module.exports = (dependencies) => {

    const { messageRepository } = dependencies.DBService;
    //const encryptionService = dependencies.EncryptionService;

    const getMessages = (req, res, next) => {

        const query = GetMessages(messageRepository);

        query.Execute().then((data) => {

            /*
            encryptionService.decrypt('Password used to generate key', '8386e558c676fa63c7f238b829b72618.22f8d9a64be830f613aa36c45aabed60d7b25c631e4bf86822f17d610ac08aa2')
            .then(d => console.log(d));
            */
            
            res.json(data);
        }, (err) => {
            next(err);
        });
    };

    return {
        getMessages
    };
}