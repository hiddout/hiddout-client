const Spinner = require('cli-spinner').Spinner;
const util = require('./util');

const downloadingStr = new Spinner('download nwjs client to local %s');
downloadingStr.setSpinnerString(18);
downloadingStr.start();

util.downloadClientAndSDK()
	.then(() => {
		downloadingStr.stop();
		console.log('Download finished!');

		// utils.rebuildNW()
		// 	.then(() => {
		// 		console.log('Install finished!');
		// 		console.log('Project is ready for development!');
		// 	})
		// 	.catch((e) => {
		// 		console.log(`Build native modules error: ${e}`);
		// 	});
	})
	.catch((e) => {
		console.log(`Download error: ${e}`);
		downloadingStr.stop();
	});
