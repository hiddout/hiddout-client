const path = require('path');
const fsExtra = require('fs-extra');

const rootPath = process.cwd();

const webFolderSrc = 'public';

const prebuildPath = path.join(rootPath, 'prebuild' , webFolderSrc);
const webSrc = path.join(rootPath, webFolderSrc);

fsExtra.emptyDirSync(webSrc);

fsExtra.copySync( prebuildPath , webSrc);

const extensionPath = path.join(webSrc, 'js','hiddout-extension.js');

const source = fsExtra.readFileSync(path.join(rootPath, './node_modules/hiddout-viewer/dist/hiddoutViewer.js')).toString();

const version = require('../package.json').dependencies['hiddout-viewer'];

const template = `onmessage = function(e) {
	const viewer = "${source}";
	console.log('hiddout ${version}');
	postMessage(viewer);
};`;


fsExtra.appendFileSync(extensionPath, template);
