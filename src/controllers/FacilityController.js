const GetFacilities = require('../application/use_cases/GetFacilities');

module.exports = (dependencies) => {

    const { facilityRepository } = dependencies.DBService;

    const getAll = (req, res, next) => {
        //localhost:3000/facilities/?page=1&limit=10&sort=name&order=asc&filter={%22road_name%22:%20%22ANG%20MO%22}
        //localhost:3000/facilities/?page=1&sort=name&order=asc&filter={%22name%22:%20%22100%22,%20%22road_name%22:%20%22AN%22}
        //localhost:3000/facilities/?page=1&limit=100
        
        const query = GetFacilities(facilityRepository);

        let page = 1, limit = 10, sort = '', order = 'asc', filter = {};

        if (req.query.page) page = req.query.page;
        if (req.query.limit) limit = parseInt(req.query.limit);
        if (req.query.sort) sort = req.query.sort;
        if (req.query.order) order = req.query.order;
        if (req.query.filter) filter = JSON.parse(req.query.filter);
        
        query.Execute(page, limit, sort, order, filter).then((data) => {
            res.json(data);
        }, (err) => {
            next(err);
        });
    };

    return {
        getAll
    };
}