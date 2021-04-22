const express = require('express');
//const jwt = require('jsonwebtoken');

const LoginController = require('../controllers/LoginController');


// address - /<host>:<port>/login
// load dependencies

//const TOKEN_SECRET='a46bfb4ed7af4c6357f2b69b3ba98faef16e55f58b0d2a72415651bf3bfa3d3998921468c584c5e70d1a342b5ca8d72c576f0a9fed68b4d5c249d07b127324c8';

const loginRouter = (dependencies) => {
    const router = express.Router();

    // load controller with dependencies
    const controller = LoginController(dependencies);
    /*
    router.get('/', (req, res) => {
        //* Do some secret login
        const token = jwt.sign({id: req.query.username}, TOKEN_SECRET, { expiresIn: 1800 });
        return res.json(token);
    });
    */
    router.get('/', controller.login);
    return router;
};

module.exports = loginRouter;