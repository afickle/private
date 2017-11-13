const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');

// 提取css
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// __dirname 是node.js中的一个全局变量，它指向当前执行脚本所在的目录
const ROOT_PATH = path.resolve(__dirname);

const APP_PATH = path.resolve(ROOT_PATH, 'src');
const TEMPLATE_PATH = path.resolve(ROOT_PATH, 'template');
const BUILD_PATH = path.resolve(ROOT_PATH, 'dist');

const config = {
    entry: {
        main: path.resolve(APP_PATH, 'index.js'),
        vendor: ['react', 'react-dom', 'react-router-dom']
    },
    // entry: './src/index.js',
    // 
    output: {
        filename: '[name]-[hash].js',
        // filename: '[name]-[chunkhash].js',
        // publicPath: BUILD_PATH,
        path: BUILD_PATH,
        chunkFilename: '[name].[chunkhash:5].chunk.js'
    },

    resolve: {
        extensions: ['.js', '.jsx']
    },

    module: {
        rules: [
            {
                test: /\.(css|less)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'less-loader']
                }),
                // use: ['style-loader', 'css-loader', 'less-loader'],
                include: APP_PATH
            },
            {
                test: /\.jsx?$/,
                include: APP_PATH,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'react']
                    }
                }
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: 'file-loader'
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: 'file-loader'
            },
            {
                test: /\.(csv|tsv)$/,
                use: 'csv-loader'
            },
            {
                test: /\.xml$/,
                use: 'xml-loader'
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'React + Todos',
            template: path.resolve(TEMPLATE_PATH, 'index.html'),
            favicon: path.resolve(APP_PATH, 'img/favicon.ico')
        }),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common'
        }),
        new ExtractTextPlugin({
            filename: '[name].css'
        })
    ]
};

module.exports = config;