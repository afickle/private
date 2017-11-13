const merge = require('webpack-merge');
const comm = require('./webpack.comm.config.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = merge(comm, {
    // devtool: 'inline-source-map',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: './dist',
        historyApiFallback: true,
        hot: true,
        inline: true
    },
    plugins: [
        new CleanWebpackPlugin(['dist'])
    ]
})