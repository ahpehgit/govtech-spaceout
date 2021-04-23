const cron = require('node-cron');

const GetFacilities = require('./GetFacilities');
const GetCrowdLevels = require('./GetCrowdLevels');

const start = (dependencies, schedule) => {

	cron.schedule(schedule, async() => {

		const getFacilities = GetFacilities(dependencies);
		const getCrowdLevels = GetCrowdLevels(dependencies);

		Promise.all([getFacilities, getCrowdLevels])
		.then(() => {
			const now = new Date();
			console.log('Cron job executed at', now.toLocaleString());
		});
        
	});
}

module.exports = {
    start,
}