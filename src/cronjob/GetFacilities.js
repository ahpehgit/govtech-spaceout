const axios = require('axios');

const GetFacilities = async(dependencies) => {
	
	await axios.get('https://jsonplaceholder.typicode.com/todos/1')
    .then(response => {
    	const { data } = response;
    	console.log('response: ', data)
    })
    .catch(function (error) {
	    // handle error
	    console.log('error: ', error);
	});
}

module.exports = GetFacilities