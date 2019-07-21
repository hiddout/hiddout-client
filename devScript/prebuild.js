const path = require('path');
const fsExtra = require('fs-extra');

const rootPath = process.cwd();

const webFolderSrc = 'public';

const prebuildPath = path.join(rootPath, 'prebuild' , webFolderSrc);
const webSrc = path.join(rootPath, webFolderSrc);

fsExtra.emptyDirSync(webSrc);

fsExtra.copySync( prebuildPath , webSrc);
