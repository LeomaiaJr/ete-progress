const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

module.exports = {
	entry: './src/web/main.ts',
	output: {
		path: path.resolve(__dirname, 'web'),
		filename: 'bundle.js',
		publicPath: '/'
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/web/index.pug'
		}),
		new MiniCssExtractPlugin({
			filename: 'style.css'
		})
	],
	module: {
		rules: [
			{test: /\.pug$/, use: 'pug-loader'},
			{test: /\.ts$/, use: 'ts-loader'},
			{test: /\.(sa|sc|c)ss$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']}
		]
	}
}