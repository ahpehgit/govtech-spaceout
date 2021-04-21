const axios = require('axios');

const GetCrowdLevels = async(dependencies) => {
	
	const { crowdLevelRepository } = dependencies.DBService;
	
	const body = {
		query: `{ facilities { id, band, createdAt, trend } }`
	}

    await axios.post('https://www.spaceout.gov.sg/graphql', body) 
    .then(response => {
    	const { data } = response;

		return new Promise(async (resolve) => {
			const ids = await crowdLevelRepository.getAllIds();
			//console.log(ids);

			const arr = [];
			data.data.facilities.forEach(d => {
				const id = d.id;
				const timestamp = Date.parse(d.createdAt);
				if (!ids.includes(id + '_' + timestamp)) { //prevent duplicate records to be inserted. Assume unique id by id and createdAt
					d.createdAt = new Date(timestamp);
					arr.push(d);
				}
			});
			//console.log(arr);
			await crowdLevelRepository.addMany(arr);
			resolve();
		});
    })
	.then(async () => {
		//const data = await crowdLevelRepository.getAll();
		//console.log(data);
	})
    .catch(function (error) {
	    // handle error
	    console.log('error: ', error);
	});
}

module.exports = GetCrowdLevels