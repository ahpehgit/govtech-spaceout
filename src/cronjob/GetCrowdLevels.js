const axios = require('axios');

const GetCrowdLevels = async(dependencies) => {
	
	await axios.get('https://jsonplaceholder.typicode.com/posts/90')
    .then(response => {
    	const { data } = response;
    	console.log('response: ', data)
    })
    .catch(function (error) {
	    // handle error
	    console.log('error: ', error);
	});
}

module.exports = GetCrowdLevels