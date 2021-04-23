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

            let seen = {};
            const nonDupData = data.data.facilities.filter(d => {
                const { id, createdAt } = d;
                const timestamp = Date.parse(createdAt);
                const key = id + '_' + timestamp;

                if (!seen.hasOwnProperty(key)) {
                    seen = {...seen, [key]: key};
                    return true;
                }
                return false;
            });
            
            const arr = [];
            nonDupData.forEach(d => {
                const { id, createdAt } = d;
                const timestamp = Date.parse(createdAt);
                const key = id + '_' + timestamp;

                if (!ids.includes(key)) { //prevent duplicate records to be inserted. Assume unique id by id and createdAt
                    d.createdAt = new Date(timestamp);
                    arr.push(d);
                }
            });

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