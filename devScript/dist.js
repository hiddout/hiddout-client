const path = require('path');
const fsExtra = require('fs-extra');

const webFolderSrc = 'public';

const distPath = path.join(process.cwd(), 'dist');
const webSrc = path.join(process.cwd(), webFolderSrc);

fsExtra.emptyDirSync(distPath);
fsExtra.copySync(webSrc, path.join(distPath, webFolderSrc));