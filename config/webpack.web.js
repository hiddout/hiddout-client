const merge = require('webpack-merge'),
	common = require('./webpack.common.js');

const webConfig = {
	entry: './src/main.web.js',
	mode: 'development',
	devServer: {
		historyApiFallback: true,
	},
};

module.exports = merge(common, webConfig);