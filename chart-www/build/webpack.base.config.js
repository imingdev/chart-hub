/**
 * @intro: webpack配置基类.
 */
const path = require('path');
const WebpackBarPlugin = require('webpackbar');
const { filenames, assetsLoaders, dir, resolve } = require('./config');

module.exports = {
  context: resolve('/'),
  entry: {
    app: './src/main.jsx',
  },
  output: {
    path: path.join(dir.root, dir.dist),
    publicPath: '/',
    filename: filenames.app,
    chunkFilename: filenames.chunk,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': path.join(dir.root, dir.src),
    },
  },
  module: {
    rules: [{
      test: /\.(jsx?)$/,
      loader: 'babel-loader',
      include: [path.join(dir.root, dir.src)],
      options: {
        compact: false,
      },
    }]
      .concat(assetsLoaders),
  },
  plugins: [
    new WebpackBarPlugin(),
  ],
  performance: {
    hints: false,
  },
  stats: 'none',
};
