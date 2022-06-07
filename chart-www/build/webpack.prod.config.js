/**
 * @intro: webpack配置生产.
 */
const merge = require('webpack-merge').default;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const DotEnvWebpackPlugin = require('dotenv-webpack');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const webpackBaseConfig = require('./webpack.base.config');
const { styleLoaders, filenames, dir, resolve } = require('./config');

module.exports = merge(webpackBaseConfig, {
  mode: 'production',
  devtool: false,
  module: {
    rules: styleLoaders({
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
      filename: filenames.css,
      chunkFilename: filenames.css,
      ignoreOrder: true,
    }),
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: dir.index,
      template: dir.template,
      inject: true,
      favicon: 'favicon.ico',
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
          test: ({ resource }) => resource && /\.js$/.test(resource) && resource.indexOf(resolve('node_modules')) === 0,
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
