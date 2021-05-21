const express = require('express');
const FacilityController = require('../controllers/FacilityController');
const AuthenticateController = require('../controllers/AuthenticateController');

// address - /<host>:<port>/facilities
// load dependencies

const facilityRouter = (dependencies) => {
    const router = express.Router();

    // load controller with dependencies
    const controller = FacilityController(dependencies);
    const authenticateController = AuthenticateController(dependencies);

    router.get('/', authenticateController.authenticateToken, controller.getAll); //token middleware
    //router.get('/', controller.getAll)    
    return router;
};

module.exports = facilityRouter;