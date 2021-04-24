const express = require('express');
const CrowdLevelController = require('../controllers/CrowdLevelController');
const AuthenticateController = require('../controllers/AuthenticateController');

// address - /<host>:<port>/crowdLevels
// load dependencies

const crowdLevelRouter = (dependencies) => {
    const router = express.Router();

    // load controller with dependencies
    const controller = CrowdLevelController(dependencies);
    const authenticateController = AuthenticateController(dependencies);

    router.get('/', authenticateController.authenticateToken, controller.getAll); //token middleware
    //router.get('/', controller.getAll)    
    return router;
};

module.exports = crowdLevelRouter;