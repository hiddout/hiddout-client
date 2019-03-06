const path = require('path'),
	merge = require('webpack-merge'),
	common = require('./webpack.common.js');

const webConfig = {
	entry: './src/main.web.js',
	output:{
		publicPath: path.resolve(__dirname, '/public/js'),
	},
	mode: 'development',
	devtool: 'eval-source-map',
	devServer: {
		contentBase: './',
		historyApiFallback: true,
	},
};

module.exports = merge(common, webConfig);