module.exports = {
  // eslint格式化代码
  '{chart-www,chart-server,chart-static}/src/**/*.{js,jsx}': (filenames) => [`eslint ${filenames.join(' ')}`],
  // stylelint格式化代码
  'chart-www/src/**/*.{css,scss}': (filenames) => [`stylelint ${filenames.join(' ')}`],
};
