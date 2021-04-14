import cron from 'node-cron';

const start = (schedule) => {
	cron.schedule(schedule, () => {	  
	  console.log('Cron job running every 5 seconds');
	});
}

/*
export default {
	start,
};
*/

module.exports = {
    start,
}

/*
const stop = {
	f: () => console.log('Stop')
}

const start2 = () => {
	const run = (schedule) => {
		cron.schedule(schedule, () => {	  
		  console.log('Cron job running every 5 seconds');
		});
	};

	return { run }
}

const outer = () => {
	let b = 10;

	const inner = () => {
		let a = 20;
		console.log(a + b);
		b = 15;
	}

	const inner2 = () => console.log(b) 

	return { inner, inner2 }
}
export default {
	start,
	stop,
	start2,
	outer,
};
*/