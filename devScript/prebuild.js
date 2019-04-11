const path = require('path');
const fsExtra = require('fs-extra');

const webFolderSrc = 'public';

const prebuildPath = path.join(process.cwd(), 'prebuild' , webFolderSrc);
const webSrc = path.join(process.cwd(), webFolderSrc);

fsExtra.emptyDirSync(webSrc);

fsExtra.copySync( prebuildPath , webSrc);
