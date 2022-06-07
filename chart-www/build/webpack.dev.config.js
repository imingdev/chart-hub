/**
 * @intro: webpack配置开发.
 */
const merge = require('webpack-merge').default;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const DotEnvWebpackPlugin = require('dotenv-webpack');
const baseWebpackConfig = require('./webpack.base.config');
const { styleLoaders, dir } = require('./config');

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  module: {
    rules: styleLoaders({ usePostCSS: true }),
  },
  devServer: {
    allowedHosts: 'all',
    historyApiFallback: true,
    client: {
      logging: 'warn',
      overlay: { warnings: false, errors: true },
    },
    hot: true,
    static: false,
    host: 'localhost',
    port: 10086,
    open: false,
    proxy: [{
      // 接口地址代理
      context: ['/api'],
      target: 'http://localhost:10087',
      changeOrigin: true,
      secure: true,
      pathRewrite: {
        '^/api': '',
      },
    }, {
      // 静态资源地址代理
      context: ['/asset', '/dep', '/dep', '/ecg-storage'],
      target: 'http://localhost:10088',
      changeOrigin: true,
      secure: true,
    }],
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
      filename: dir.index,
      template: dir.template,
      inject: true,
      favicon: 'favicon.ico',
    }),
  ],
});
