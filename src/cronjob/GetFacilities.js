const axios = require('axios');

const GetFacilities = async(dependencies) => {

	const encryptionService = dependencies.EncryptionService;
	const { facilityRepository } = dependencies.DBService;

	const body = {
		query: `{ geojsonPoly }`
	}

	await axios.post('https://www.spaceout.gov.sg/graphql', body) 
    .then(response => {
    	const { data } = response;

    	return new Promise(async (resolve) => {
    		encryptionService.decrypt('pyRYtDWQLu83RaPCNZudQdW4WbtDdF6q', data.data.geojsonPoly)
    		.then(async(d) => {
            	const facilities = JSON.parse(d);
            	//console.log(facilities.jsonstring.features[0]);
            	//console.log(facilities.jsonstring.features[0].geometry);
            	//console.log(facilities.jsonstring.features[0].properties);

				const ids = await facilityRepository.getAllIds();
            	const arr = facilities.jsonstring.features.map(f => f.properties);
				const toBeAdded = arr.filter(d => !ids.includes(d.ID));
				//console.log(toBeAdded);
            	await facilityRepository.addMany(toBeAdded);

            	resolve();
            });
    	});
    })
    .then(async () => {
		//const data = await facilityRepository.getAll();
		//console.log('Get Facilities: ', data);
	})
    .catch(function (error) {
	    // handle error
	    console.log('error: ', error);
	});
}

module.exports = GetFacilities