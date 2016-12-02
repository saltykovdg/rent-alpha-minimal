const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: [
      'babel-polyfill',
      './src/index.js'
    ]
  },
  output: {
    path: './build',
    filename: '[name].[chunkhash].js',
    publicPath: '/'
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
    inline: true
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
        'RENT_API_URL': JSON.stringify('/rent-api')
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      minChunks: Infinity,
      filename: 'common.js',
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      title: 'Rent 1.0'
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      mangle: false,
      output: { comments: false },
      compressor: {
        warnings: false
      }
    }),
  ]
};
