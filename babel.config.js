const utils = require('./bin/webpack/utils');

module.exports = {
  presets: ['react-app'],
  plugins: [
    '@pieced/babel-plugin-auto-css-modules',
    utils.isDevelopment && 'react-refresh/babel',
  ].filter(Boolean),
};
