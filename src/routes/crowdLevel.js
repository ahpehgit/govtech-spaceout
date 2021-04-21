const express = require('express');
const CrowdLevelController = require('../controllers/CrowdLevelController');
const authenticateToken = require('./authenticateToken');

// address - /<host>:<port>/facilities
// load dependencies

const crowdLevelRouter = (dependencies) => {
    const router = express.Router();

    // load controller with dependencies
    const controller = CrowdLevelController(dependencies);

    //router.get('/', authenticateToken, controller.getAll); //token middleware
    router.get('/', controller.getAll)    
    return router;
};

module.exports = crowdLevelRouter;