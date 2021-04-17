const express = require('express');
const cors = require('express');
const routes = require('./routes');
const dependencies = require('./config/dependencies');
const cronjob = require('./cronjob');

const app = express();
const port = process.env.PORT || 3000;

dependencies.DBService.initDatabase().then(() => {

    // * Application-Level Middleware * //

    // Third-Party Middleware
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Built-In Middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // load routes
    app.use('/', routes(dependencies));

    // * Cron * //
    cronjob.start(dependencies, '*/30 * * * * *');

    // * Start * //
    app.listen(port, () =>
    console.log(`Example app listening on port ${port}!`),
    );
}, (err) => {
    console.log(`DB not ready, err:${err}`);
});