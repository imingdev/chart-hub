/**
 * @intro: webpack配置开发.
 */
const merge = require('webpack-merge').default;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const DotEnvWebpackPlugin = require('dotenv-webpack');
const baseWebpackConfig = require('./config.base');
const utils = require('./utils');

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  module: {
    rules: utils.styleLoaders({ usePostCSS: true }),
  },
  devServer: {
    allowedHosts: 'all',
    historyApiFallback: true,
    client: {
      logging: 'warn',
      overlay: { warnings: false, errors: true },
    },
    hot: true,
    static: false, // since we use CopyWebpackPlugin.
    host: 'localhost',
    port: 10086,
    open: false,
  },
  plugins: [
    // env
    new DotEnvWebpackPlugin({
      path: '.env.development',
      silent: true, // hide any errors
      systemvars: true,
      defaults: '.env',
    }),
    new ReactRefreshWebpackPlugin({
      overlay: false,
    }),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'client/index.ejs',
      inject: true,
      favicon: 'client/favicon.ico',
    }),
  ],
});
