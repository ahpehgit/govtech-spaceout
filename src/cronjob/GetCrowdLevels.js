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
		/*
    	data.data.facilities.forEach(d => {
    		const timestamp = Date.parse(d.createdAt);
    		crowdLevelRepository.add({id: d.id, band: d.band, createdAt: new Date(timestamp), trend: d.trend});
    	})
		*/
		
		return new Promise(async (resolve) => {
			//const d = data.data.facilities[0];
			//const timestamp = Date.parse(d.createdAt);
			//await crowdLevelRepository.add({id: d.id, band: d.band, createdAt: new Date(timestamp), trend: d.trend});
			
			const arr = [];
			for (let i=0; i<20; i++) {
				const timestamp = Date.parse(data.data.facilities[i].createdAt);
				data.data.facilities[i].createdAt = new Date(timestamp);
				arr.push(data.data.facilities[i]);
			}
			
			await crowdLevelRepository.addMany(arr);

			resolve();
		});
    })
	.then(async () => {
		const data = await crowdLevelRepository.getAll();
		console.log(data);
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