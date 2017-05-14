const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    vendor: [path.join(__dirname, 'vendors.js')],
  },
  output: {
    filename: 'dll.[name].js',
    path: path.join(__dirname, 'build', 'dll'),
    library: '[name]',
  },
  module: {
    rules: [
      {
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
    new webpack.DllPlugin({
      path: path.join(__dirname, 'build', 'dll', '[name]-manifest.json'),
      name: '[name]',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      mangle: false,
      output: {
        comments: false
      },
      compressor: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    })
  ],
};
