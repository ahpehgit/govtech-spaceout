const Login = require('../application/use_cases/Login');

module.exports = (dependencies) => {

    const { authorisedUserRepository } = dependencies.DBService;

    const login = (req, res, next) => {

        const query = Login(authorisedUserRepository);

        let name = null, password = null;

        if (req.query.name) name = req.query.name;
        if (req.query.password) password = req.query.password;

        query.Execute(name, password).then((data) => {
            if (data) res.json(data);
            else res.sendStatus(401);
        }, (err) => {
            next(err);
        });
    };

    return {
        login
    };
}