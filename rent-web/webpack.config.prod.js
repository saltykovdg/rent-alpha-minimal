const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');

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
  plugins: [
    new webpack.DllReferencePlugin({
      context: '.',
      manifest: require('./build/dll/vendor-manifest.json')
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        RENT_API_URL: JSON.stringify('/rent-api'),
        // RENT_API_URL: JSON.stringify('https://rent-demo.herokuapp.com'),
        RENT_API_CONTENT_URL: JSON.stringify('/content'),
        RENT_API_MAX_FILE_SIZE: JSON.stringify('15728640')
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
      title: 'Rent 1.0',
      inject: true,
      production: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
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
        to: path.join(__dirname, 'build', 'distr')
      },
    ]),
    new HtmlWebpackIncludeAssetsPlugin({
      assets: ['dll.vendor.js'],
      append: false
    })
  ]
};
