const axios = require('axios');

const GetCrowdLevels = async(dependencies) => {
	
	const { crowdLevelRepository } = dependencies.DBService;
	
	const body = {
		query: `{ facilities { id, band, createdAt, trend } }`
	}

    await axios.post('https://www.spaceout.gov.sg/graphql', body) 
    .then(response => {
    	const { data } = response;
    	//console.log('response: ', data.data.facilities)
    	data.data.facilities.forEach(d => {
    		const timestamp = Date.parse(d.createdAt);
    		crowdLevelRepository.add({id: d.id, band: d.band, createdAt: new Date(timestamp), trend: d.trend});
    	})
    })
    .catch(function (error) {
	    // handle error
	    console.log('error: ', error);
	});

    /*
	const data = await crowdLevelRepository.getAll();

	return new Promise((resolve, reject) => {
		console.log('GetCrowdLevels: ', data);
		resolve('GetCrowdLevels');
	});
	*/
}

module.exports = GetCrowdLevels