const express = require('express');
const facility = require('./facility');
const crowdLevel = require('./crowdLevel');
const login = require('./login');

const apiRouter = (dependencies) => {
    const routes = express.Router();

    const facilityRouter = facility(dependencies);
    const crowdLevelRouter = crowdLevel(dependencies);
    const loginRouter = login(dependencies);

    routes.use('/facilities', facilityRouter);
    routes.use('/crowdLevels', crowdLevelRouter);
    routes.use('/login', loginRouter);

    return routes;
};

module.exports = apiRouter;