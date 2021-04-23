const GetCrowdLevels = require('../application/use_cases/GetCrowdLevels');

module.exports = (dependencies) => {

    const { crowdLevelRepository, facilityRepository } = dependencies.DBService;

    const getAll = (req, res, next) => {

        //localhost:3000/crowdLevels/?start=2020-11-03T00:00:00.000Z&end=2021-04-23T12:58:00.000Z
        
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