const FacilityCrowdLevel = require('../../entities/FacilityCrowdLevel');

module.exports = (CrowdLevelRepository, FacilityRepository) => {

    const Execute = async (start = null, end = null) => {

    	if (!start && !end) {
    		//* No filters, so return facilties with their latest crowd data

    		const promise1 = FacilityRepository.getAllIds();
    		const promise2 = CrowdLevelRepository.getAllFacilityIds(); 

    		let result = [];
	    	await Promise.all([promise1, promise2]).then(async(values) => {
	    		const facilityIds = values[0];
	    		const crowdLevelFacilityIds = values[1];
	    		const commonIds = facilityIds.filter(facilityId => crowdLevelFacilityIds.includes(facilityId)); //get out facility ids that exists in both facilityIds and crowdLevelIds

	    		const crowdLevels = await CrowdLevelRepository.getAllByFacilityIds(commonIds); //result is sorted by createdAt descending order

	    		//* Filter out duplicated crowd level with the same facility id
	    		let seen = {};
	    		const nonDupCrowdLevels = crowdLevels.filter(d => {
					const key = d.id;

					if (!seen.hasOwnProperty(key)) {
						seen = {...seen, [key]: key};
	                    return true;
					}
					return false;
				});
				
				//* Get facilities data based on nonDupCrowdLevels
				const nonDupCrowdLevelsFacilityIds = nonDupCrowdLevels.map(d => d.id);
				const facilities = await FacilityRepository.getAllByIds(nonDupCrowdLevelsFacilityIds);

				result = nonDupCrowdLevels.map(crowdLevelObj => {
					let faciltyObj = null;
					facilities.forEach(f => {
						if (crowdLevelObj.id === f.id) {
							faciltyObj = f;
							return;
						}
					});

					if (faciltyObj) {
						return new FacilityCrowdLevel(faciltyObj, crowdLevelObj.band);
					}
					return null;
				}).filter(res => res !== null);;

				/*
				// get dups
				let seen2 = {};
	    		const dupData = crowdLevels.filter(d => {
					const key = d.id;

					if (seen.hasOwnProperty(key)) {
						return true;
					}
					seen2 = {...seen, [key]: key};
					return false;
				});
				commonIds = dupData;
				*/
	    	});

	    	return result;
    	} 
    	else if (start && end) {
    		//* Has filters, so return facilties with their crowd data avg band based on date range
    		let result = [];
			const crowdLevels = await CrowdLevelRepository.getAllAverageBandByDateRange(start, end);
			const facilityIds = crowdLevels.map(d => d.id);
			const facilities = await FacilityRepository.getAllByIds(facilityIds);

			result = crowdLevels.map(crowdLevelObj => {
					let faciltyObj = null;
					facilities.forEach(f => {
						if (crowdLevelObj.id === f.id) {
							faciltyObj = f;
							return;
						}
					});

					if (faciltyObj) {
						return new FacilityCrowdLevel(faciltyObj, crowdLevelObj.band);
					}
					return null;
				}).filter(res => res !== null);

			return result;
		}
		
		//* TODO change to return []
        return await CrowdLevelRepository.getAllByDateRange(start, end);
    }

    return {
        Execute
    };
}