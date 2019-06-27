const path = require('path'),
	CircularDependencyPlugin = require('circular-dependency-plugin'),
	HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	output: {
		path: path.resolve(__dirname, '../public/js'),
		publicPath: '/public/js/',
		filename: 'hiddout.[contenthash].js',
		chunkFilename: '[name].[contenthash].bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							[
								'@babel/preset-env',
								{
									useBuiltIns: 'usage',
									corejs: '3',
								},
							],
							'@babel/preset-react',
							'@babel/preset-flow',
						],
						plugins: [
							'@babel/plugin-proposal-class-properties',
							'@babel/plugin-proposal-object-rest-spread',
							'@babel/plugin-syntax-dynamic-import',
						],
					},
				},
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader',
				],
			}, {
				test: /\.(png|jpg|jpeg|ico|ttf|otf|eot|svg|woff(2)?)$/,
				use: ['file-loader'],
			},
		],
	},
	plugins: [
		new CircularDependencyPlugin({
			exclude: /node_modules/,
			failOnError: true,
			cwd: process.cwd(),
		}),
		new HtmlWebpackPlugin({
			filename: '../index.[hash].html',
			template: 'index.html',
		}),
	],
};