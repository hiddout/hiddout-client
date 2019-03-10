const merge = require('webpack-merge'),
	common = require('./webpack.common.js');

const webConfig = {
	entry: './src/main.web.js',
	output: {
		filename: './public/js/hiddout.js', // <-- it has to be that way, otherwise dev-server will not working!!!!
	},
	mode: 'development',
	devtool:'eval-source-map',
	devServer: {
		historyApiFallback: true,
	},
};

module.exports = merge(common, webConfig);