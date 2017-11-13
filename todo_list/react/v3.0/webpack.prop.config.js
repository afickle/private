const webpack = require('webpack');
const merge = require('webpack-merge');
const comm = require('./webpack.comm.config.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

// process.env.NODE_ENV !== 'production'

module.exports = merge(comm, {
    // devtool: 'source-map',
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new UglifyJSPlugin({
            // sourceMap: true
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ]
})