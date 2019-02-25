const util = require('./util');

const platform = /^win/.test(process.platform) ? 'win' : 'mac';

util.childProcessRunNPM(['run', `dev-${platform}`], process.cwd()).then((code) => {
	console.log(`Code: ${code}`);
}).catch(e => {
	console.log(`ERROR: ${e}`);
});