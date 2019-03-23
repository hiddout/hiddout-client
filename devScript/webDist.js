const path = require('path');
const fsExtra = require('fs-extra');

const webFolderSrc = 'public';
const indexHTML = 'index.html';

const distPath = path.join(process.cwd(), 'dist', 'web');
const webSrc = path.join(process.cwd(), webFolderSrc),
	indexSrc = path.join(process.cwd(), indexHTML);

fsExtra.ensureDirSync(distPath);
fsExtra.copySync(webSrc, path.join(distPath, webFolderSrc));
fsExtra.copySync(indexSrc, path.join(distPath, webFolderSrc, indexHTML));