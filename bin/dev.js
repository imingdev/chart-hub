const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack/config.dev');

const devServerOptions = webpackConfig.devServer;
delete webpackConfig.devServer;

const compiler = webpack(webpackConfig);
const server = new WebpackDevServer(devServerOptions, compiler);

(async () => {
  await server.start();
})();
