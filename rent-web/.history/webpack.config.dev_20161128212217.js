const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: {
    main: [
      'react-hot-loader/patch',
      'babel-polyfill',
      'webpack-dev-server/client?http://localhost:8090',
      'webpack/hot/only-dev-server',
      './src/index.js'
    ]
  },
  output: {
    path: './build',
    filename: '[name].[chunkhash].js',
    publicPath: '/',
    // devtoolModuleFilenameTemplate: '[resource-path]',
    devtoolLineToLine: true,
    sourceMapFilename: '[name]'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components|build)/,
        loader: 'babel'
      }, {
        test: /\.css?$/,
        loaders : [
          'style-loader',
          'css-loader'
        ]
      }, {
        test: /\.less?$/,
        loaders : [
          'style-loader',
          'css-loader',
          'less-loader?{"sourceMap":true}'
        ],
        include: __dirname
      }, {
        test: /\.(jpe?g|png|gif|svg)$/,
        loader: 'url',
        query: {limit: 10240}
      }
    ]
  },
  devServer: {
    port: 8090,
    historyApiFallback: true,
    inline: true,
    outputPath: './build'
  },
  plugins: [
    new WriteFilePlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development'),
        'RENT_API_URL': JSON.stringify('http://localhost:8080/')
      }
    }),
    new webpack.optimize.CommonsChunkPlugin('common.js'),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      title: 'Rent 1.0'
    })
  ]
};
