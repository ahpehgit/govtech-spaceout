const axios = require('axios');
const Facility = require('../entities/Facility');

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
                /*
            	const arr = facilities.jsonstring.features.map(f => {
                    const { ID, NAME, TYPE, CENTER, ADDRESS, BLK_HOUSE, ROAD_NAME, OTHER_NAME, POSTALCODE } = f.properties;
                    return new Facility(ID, NAME, TYPE, CENTER, ADDRESS, BLK_HOUSE, ROAD_NAME,OTHER_NAME, POSTALCODE);
                });
                */

                let seen = {};
                const arr = facilities.jsonstring.features.filter(f => {
                    const { ID, NAME, TYPE, CENTER, ADDRESS, BLK_HOUSE, ROAD_NAME, OTHER_NAME, POSTALCODE } = f.properties;
                    if (!seen.hasOwnProperty(ID)) {
                        seen = {...seen, [ID]: ID};
                        return true;
                    }
                    return false;
                }).map(f => {
                    const { ID, NAME, TYPE, CENTER, ADDRESS, BLK_HOUSE, ROAD_NAME, OTHER_NAME, POSTALCODE } = f.properties;
                    return new Facility(ID, NAME, TYPE, CENTER, ADDRESS, BLK_HOUSE, ROAD_NAME,OTHER_NAME, POSTALCODE);
                });

				const toBeAdded = arr.filter(d => !ids.includes(d.id));
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