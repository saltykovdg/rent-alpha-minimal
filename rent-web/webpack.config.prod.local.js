const webpack = require('webpack');
const baseConfig = require('./webpack.config.prod.base');

baseConfig.plugins.push(
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
      RENT_API_URL: JSON.stringify('/rent-api'),
      RENT_API_CONTENT_URL: JSON.stringify('/content'),
      RENT_API_MAX_FILE_SIZE: JSON.stringify('15728640'),
    },
  })
);

module.exports = baseConfig;
