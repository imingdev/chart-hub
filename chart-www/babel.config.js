const { isDevelopment } = require('./build/config');

module.exports = {
  presets: ['react-app'],
  plugins: [
    '@pieced/babel-plugin-auto-css-modules',
    isDevelopment && 'react-refresh/babel',
  ].filter(Boolean),
};
