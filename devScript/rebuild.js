const util = require('./util');

util.rebuildNW().then(()=>{
	console.log(`Rebuild native module finished!`);
}).catch(e => {
	console.log(`Error: ${e}`);
});