const merge = require('webpack-merge'),
	common = require('./webpack.common.js');

const webConfig = {
	entry: './src/main.web.js',
	mode: 'production',
};

module.exports = merge(common, webConfig);