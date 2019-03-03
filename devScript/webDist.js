const path = require('path');
const fsExtra = require('fs-extra');

const webSrcName = 'hiddout.js';

const distPath = path.join(process.cwd(), 'dist');
const webSrc = path.join(process.cwd(), webSrcName);

fsExtra.ensureDirSync(distPath);
fsExtra.copySync(webSrc, path.join(distPath, webSrcName));