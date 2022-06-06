/**
 * @intro: webpack配置生产.
 */
const merge = require('webpack-merge').default;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const DotEnvWebpackPlugin = require('dotenv-webpack');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const webpackBaseConfig = require('./config.base');
const utils = require('./utils');

module.exports = merge(webpackBaseConfig, {
  mode: 'production',
  devtool: false,
  module: {
    rules: utils.styleLoaders({
      extract: true,
      usePostCSS: true,
    }),
  },
  plugins: [
    // env
    new DotEnvWebpackPlugin({
      path: '.env.production',
      silent: true, // hide any errors
      systemvars: true,
      defaults: '.env',
    }),
    new MiniCssExtractPlugin({
      filename: utils.filenames.css,
      chunkFilename: utils.filenames.css,
      ignoreOrder: true,
    }),
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'client/index.ejs',
      inject: true,
      favicon: 'client/favicon.ico',
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
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendor',
          chunks: 'initial',
          test: ({ resource }) => resource && /\.js$/.test(resource) && resource.indexOf(utils.resolve('node_modules')) === 0,
        },
        async: {
          name: 'async',
          chunks: 'async',
          minChunks: 3,
        },
      },
    },
    runtimeChunk: true,
    minimizer: [
      new CssMinimizerWebpackPlugin({
        minimizerOptions: {
          preset: ['default', {
            discardComments: {
              removeAll: true,
            },
          }],
        },
      }),
      new TerserWebpackPlugin({
        extractComments: false,
        terserOptions: {
          output: {
            comments: false,
          },
          compress: {
            drop_debugger: true,
            drop_console: true,
          },
        },
      }),
    ],
  },
});
