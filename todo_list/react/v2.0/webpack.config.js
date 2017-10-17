/*
 * @Author: lcj
 * @Date:   2017-10-17 15:58:04
 * @Last Modified by:   lcj
 * @Last Modified time: 2017-10-17 16:31:15
 * @Descriptions: 
 */
let webpack = require('webpack')

const config = {
	entry: {
		main: './src/app.jsx'
	},
	output: {
		filename: "[name].js",
		path: __dirname + "/static",
		publicPath: "/"
	},
	module: {
		rules: [{
			test: /\.css$/,
			use: ['style-loader', 'css-loader']
		}, {
			test: /\.jsx?$/,
			exclude: "/node_modules/",
			use: {
				loader: "babel-loader",
				options: {
					presets: ['es2015', 'react']
				}
			}
		}]
	},
	resolve: {
		extensions: ['.jsx', '.js']
	},
	devServer: {
		hot: true,
		inline: true,
		compress: true,
		historyApiFallback: true,
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	]
}

module.exports = config