const util = require('./util');

util.childProcessRunNPM(['run', 'build-prod'], process.cwd()).then(async () => {
	await util.dist();
}).catch(e => {
	console.log(`ERROR: ${e}`);
});