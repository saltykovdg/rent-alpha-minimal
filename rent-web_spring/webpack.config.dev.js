var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    context: path.join(__dirname, 'src', 'main', 'sources'),
    entry: ['./index.js'],
    devtool: 'source-map',
    output: {
        path: path.join(__dirname, 'src', 'main', 'resources', 'static', 'resources'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {test: /\.(png|jpg|gif|ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/, loader: 'url'},
            {test: /\.css$/, loader: ExtractTextPlugin.extract('css-loader')},
            {test: /\.js$/, loader: 'babel', query: {presets: ['es2015'], cacheDirectory: true}},
            {test: /\.html$/, loader: 'raw'}
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['static'], {
            root: path.join(__dirname, 'src', 'main', 'resources'),
            verbose: true,
            dry: false
        }),
        new CopyWebpackPlugin([{
            from: path.join(__dirname, 'src', 'main', 'sources', 'index.html'),
            to: path.join(__dirname, 'src', 'main', 'resources', 'static', 'index.html')
        }]),
        new ExtractTextPlugin('bundle.css', {allChunks: true}),
        new webpack.ProvidePlugin({
            '$': "jquery",
            'jQuery': 'jquery',
            'window.jQuery': 'jquery'
        })
    ]
};
