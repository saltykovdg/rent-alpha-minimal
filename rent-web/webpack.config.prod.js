const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    main: [
      'babel-polyfill',
      './src/index.js'
    ]
  },
  output: {
    path: path.join(__dirname, 'build', 'distr'),
    filename: '[name].[chunkhash].bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components|build)/,
        loader: 'babel-loader'
      }, {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }, {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              sourceMap: false
            }
          }
        ]
      }, {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240
            }
          }
        ]
      }
    ]
  },
  devServer: {
    port: 8090,
    historyApiFallback: true,
    inline: true
  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: '.',
      manifest: require('./build/dll/vendor-manifest.json')
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
        'RENT_API_URL': JSON.stringify('/rent-api'),
        'RENT_API_CONTENT_URL': JSON.stringify('/content'),
        'RENT_API_MAX_FILE_SIZE': JSON.stringify('15728640')
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'commons',
      minChunks: Infinity,
      filename: 'commons.js',
    }),
    new HtmlWebpackPlugin({
      favicon: './src/favicon.ico',
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
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, 'build', 'dll', 'dll.vendor.js'),
        to: path.join(__dirname, 'build', 'distr'),
      },
    ])
  ]
};
