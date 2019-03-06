const path = require('path');
const spawn = require('child_process').spawn;
const download = require('download');

const fsExtra = require('fs-extra');

const plist = require('plist');
const rcedit = require('rcedit');

function downloadClientAndSDK(){

	return new Promise((resolve, reject) => {
		const downloadPlatform = /^win/.test(process.platform) ? 'win' : 'osx';

		const clientName = `nwjs-v0.30.1-${downloadPlatform}-x64`,
			sdkName = `nwjs-sdk-v0.30.1-${downloadPlatform}-x64`;

		const downloadURL = `https://dl.nwjs.io/v0.30.1/`;

		const clientDownloadURL = `${downloadURL}${clientName}.zip`,
			sdkDownloadURL = `${downloadURL}${sdkName}.zip`;

		Promise.all([
			clientDownloadURL,
			sdkDownloadURL,
		].map(x => download(x, path.join(process.cwd()), {
			extract: true,
			headers: {accept: 'application/zip'},
		}).catch(error => {
			return reject(error);
		}))).then(()=>{
			return resolve();
		});
	});
}

exports.downloadClientAndSDK = downloadClientAndSDK;

async function childProcessRunNPM(cmd, cwd){
	return new Promise((resolve, reject) => {

		const outputLog = spawn(/^win/.test(process.platform) ? "npm.cmd" : "npm", cmd, {
			cwd: cwd,
			stdio: 'inherit',
		});

		outputLog.on('message',  (data) => {
			process.stdout.clearLine();
			process.stdout.cursorTo(0);
			process.stdout.write(data);
		});

		outputLog.on('error',  (err) => {
			reject(err)
		});
		outputLog.on('close',  (code) =>{
			resolve(code);
		});
	});
}

exports.childProcessRunNPM = childProcessRunNPM;

const enLprojPlistString = require('./en.lproj.infoPlistString').content;

const nwClientName = /^win/.test(process.platform) ? 'nw.exe' : 'nwjs.app';
const lomsClientName = /^win/.test(process.platform) ? 'Hiddout.exe' : 'Hiddout.app';
const nwClientFolderName = /^win/.test(process.platform) ?  'nwjs-v0.30.1-win-x64' : 'nwjs-v0.30.1-osx-x64';

function copyNWClientToDistFolder(nwCilentPath, distPath) {

	fsExtra.emptyDirSync(distPath);
	fsExtra.copySync(path.dirname(nwCilentPath), distPath);
}

function deleteDevDependency(dest) {
	return new Promise((resolve, reject) => {
		console.log('Deleting development dependency');

		childProcessRunNPM(['prune', '--production'], dest).then((code)=>{
			console.log(`Deleting development dependency finished, Code: ${code}`);
			return resolve();
		}).catch(e => {
			return reject(e);
		});
	});
}

async function packageSourceToNWClient(distPath) {

	const rootPath = process.cwd();
	const folders = ['public', 'assets', 'nwSystem' , 'node_modules'],
		files = ['index.html', 'package.json'];

	let dest = null;

	if (/^win/.test(process.platform)) {
		dest = path.join(distPath, 'package.nw');
		fsExtra.ensureDirSync(dest);
	} else {
		dest = path.join(distPath, nwClientName, 'Contents', 'Resources', 'app.nw');
		fsExtra.ensureDirSync(dest);
	}

	folders.forEach((name) => {
		const srcPath = path.join(rootPath, name);
		const destPath = path.join(dest, name);
		fsExtra.ensureDirSync(destPath);
		fsExtra.copySync(srcPath, destPath);
	});

	files.forEach((name) => {
		const srcPath = path.join(rootPath, name);
		const destPath = path.join(dest, name);
		fsExtra.copySync(srcPath, destPath);
	});

	await deleteDevDependency(dest);
}

async function readPlist(path) {

	return new Promise((resolve, reject) => {
		fsExtra.readFile(path, {
			encoding: 'utf-8',
		}).then((data)=>{
			return resolve(plist.parse(data));
		}).catch(e => {
			return reject(e);
		});
	});
}

async function writePlist(path, content) {
	return await fsExtra.writeFile(path, plist.build(content));
}

async function writeResourceInfo(path, resources) {
	return new Promise((resolve, reject) => {
		rcedit(path, resources, (err) => {
			if(err){
				return reject(`Could not change the resource info, warring:${err}`);
			}

			return resolve();
		});
	});
}

async function addGameInfoInNWClient(distPath){

	const rootPath = process.cwd();
	const version = fsExtra.readJsonSync(path.join(rootPath,'package.json')).version;

	let dest = null;

	if (/^win/.test(process.platform)) {
		const resources = {
			'product-version': version,
			'file-version': version,
			'version-string': {
				ProductName: 'Hiddout',
				CompanyName: 'Hiddout',
				FileDescription: 'Hiddout Client Bootstrapper',
				LegalCopyright: 'AFL-3.0',
			},
			'icon': path.join(distPath, 'package.nw', 'assets', 'Hiddout.ico'),
		};

		await writeResourceInfo(path.join(distPath, nwClientName), resources);
	} else {
		dest = path.join(distPath, nwClientName, 'Contents');
		const plistPath = path.join(dest,'info.plist');

		const plistContent = await readPlist(plistPath);
		plistContent.CFBundleIdentifier = 'io.hiddout.client';
		plistContent.CFBundleName = 'Hiddout';
		plistContent.CFBundleDisplayName = 'Hiddout';
		plistContent.CFBundleIconFile = 'app.nw/assets/Hiddout.icns';
		plistContent.CFBundleShortVersionString = version;

		await writePlist(plistPath, plistContent);
		await fsExtra.writeFile(path.join(dest,'Resources','en.lproj','InfoPlist.strings'),enLprojPlistString);
	}

	fsExtra.rename(path.join(distPath,nwClientName),path.join(distPath,lomsClientName));

	console.log('Building release version finished!');
}

async function dist() {
	console.log('Building release version begin ...');

	const distPath = path.join(process.cwd(), 'dist', 'hiddout');
	const nwCilentPath = path.join(process.cwd(), nwClientFolderName, nwClientName);

	if (!fsExtra.pathExistsSync(nwCilentPath)) {
		console.log('ERROR: nw.js client not exists, using "npm i" to download client first!');
		return;
	}

	copyNWClientToDistFolder(nwCilentPath, distPath);

	try{
		await packageSourceToNWClient(distPath);
		await addGameInfoInNWClient(distPath);
	} catch (e) {
		console.log(`Package source failed: ${e}`);
	}

}

exports.dist = dist;

function runNWGYP(cwd, cmd) {
	return new Promise((resolve, reject) => {

		const outputLog = spawn(/^win/.test(process.platform) ? "nw-gyp.cmd" : "nw-gyp", cmd, {
			cwd: cwd,
			stdio: 'inherit',
		});

		outputLog.on('message',  (data) => {
			process.stdout.clearLine();
			process.stdout.cursorTo(0);
			process.stdout.write(data);
		});

		outputLog.on('error',  (err) => {
			reject(err)
		});
		outputLog.on('close',  (code) =>{
			resolve(code);
		});
	});
}

function rebuildNW() {
	return new Promise(async (resolve, reject) => {
		try{
			const levelDownPath = path.join(process.cwd(),'node_modules','leveldown');
			await runNWGYP(levelDownPath,['configure','--target=0.30.1']);
			await runNWGYP(levelDownPath,['rebuild','--target=0.30.1','--arch=x64']);
			return resolve();
		}catch (e) {
			return reject(e);
		}
	});
}

exports.rebuildNW = rebuildNW;