const GetCrowdLevels = require('../application/use_cases/GetCrowdLevels');

module.exports = (dependencies) => {

    const { crowdLevelRepository, facilityRepository } = dependencies.DBService;

    const getAll = (req, res, next) => {

        const query = GetCrowdLevels(crowdLevelRepository, facilityRepository);

        let start = null, end = null;

        if (req.query.start) start = new Date(Date.parse(req.query.start));
        if (req.query.end) end = new Date(Date.parse(req.query.end));

        query.Execute(start, end).then((data) => {
            res.json(data);
        }, (err) => {
            next(err);
        });
    };

    return {
        getAll
    };
}