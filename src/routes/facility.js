const express = require('express');
const FacilityController = require('../controllers/FacilityController');
const authenticateToken = require('./authenticateToken');

// address - /<host>:<port>/facilities
// load dependencies

const facilityRouter = (dependencies) => {
    const router = express.Router();

    // load controller with dependencies
    const controller = FacilityController(dependencies);

    //router.get('/', authenticateToken, controller.getAll); //token middleware
    router.get('/', controller.getAll)    
    return router;
};

module.exports = facilityRouter;