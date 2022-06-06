/**
 * @intro: webpack配置基类.
 */
const WebpackBarPlugin = require('webpackbar');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { filenames, assetsLoaders, dist, resolve } = require('./utils');
const utils = require('./utils');

module.exports = {
  context: resolve('/'),
  entry: {
    app: './client/main.jsx',
  },
  output: {
    path: dist,
    publicPath: '/',
    filename: filenames.app,
    chunkFilename: filenames.chunk,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      client: resolve('client'),
    },
  },
  module: {
    rules: [{
      test: /\.(jsx?)$/,
      loader: 'babel-loader',
      include: [resolve('client')],
      options: {
        compact: false,
      },
    }]
      .concat(assetsLoaders),
  },
  plugins: [
    new WebpackBarPlugin(),
    // copy custom static assets
    new CopyWebpackPlugin({
      patterns: [{
        from: utils.resolve('static'),
        to: 'static',
        noErrorOnMissing: true,
        globOptions: {
          dot: true,
          ignore: ['**/.*'],
        },
      }],
    }),
  ],
  performance: {
    hints: false,
  },
  stats: 'none',
};
