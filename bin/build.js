const rm = require('rimraf');
const consola = require('consola');
const webpack = require('webpack');
const webpackConfig = require('./webpack/config.prod');

rm(webpackConfig.output.path, (err) => {
  if (err) throw err;
  webpack(webpackConfig, (e, stats) => {
    if (e) throw e;
    process.stdout.write(`${stats.toString({
      entrypoints: false,
      colors: true,
      all: false,
      assets: true,
      groupAssetsByExtension: true,
      assetsSpace: Infinity,
    })}\n\n`);

    if (stats.hasErrors()) {
      consola.error(' Build failed with errors.',stats);
      process.exit(1);
    }

    consola.success(' Build complete with success.');
  });
});
