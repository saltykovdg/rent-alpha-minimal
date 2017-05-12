const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: {
    main: [
      'babel-polyfill',
      'webpack-dev-server/client?http://localhost:8090',
      'webpack/hot/only-dev-server',
      './src/index.js'
    ]
  },
  output: {
    filename: '[name].[chunkhash].bundle.js',
    publicPath: '/',
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
              sourceMap: true
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
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development'),
        'USE_REDUX_DEVTOOLS': JSON.stringify('false'),
        'RENT_API_URL': JSON.stringify('http://localhost:8080'),
        'RENT_API_CONTENT_URL': JSON.stringify('/content'),
        'RENT_API_MAX_FILE_SIZE': JSON.stringify('15728640')
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "commons",
      minChunks: Infinity,
      filename: "commons.js"
    }),
    new HtmlWebpackPlugin({
      favicon: './src/favicon.ico',
      template: './src/index.html',
      title: 'Rent 1.0'
    })
  ]
};
