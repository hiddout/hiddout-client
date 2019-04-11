const merge = require('webpack-merge'),
	common = require('./webpack.common.js'),
	HtmlWebpackPlugin = require('html-webpack-plugin');

const webConfig = {
	entry: './src/main.js',
	output: {
		publicPath: '/',
		filename: './public/js/hiddout.[contenthash].js', // <-- it has to be that way, otherwise dev-server will not working!!!!
		chunkFilename: '[name].[contenthash].bundle.js',
	},
	mode: 'development',
	devtool: 'eval-source-map',
	devServer: {
		historyApiFallback: true,
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'index.html',
		}),
	],
};

module.exports = merge(common, webConfig);