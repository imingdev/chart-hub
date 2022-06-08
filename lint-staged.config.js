module.exports = {
  // eslint格式化代码
  '{chart-www,chart-server,chart-static}/src/**/*.{js,jsx}': (filenames) => {
    if (filenames.length) return [`eslint ${filenames.join(' ')}`];

    return [];
  },
  // stylelint格式化代码
  'chart-www/src/**/*.{css,scss}': (filenames) => {
    if (filenames.length) return [`stylelint ${filenames.join(' ')}`];

    return [];
  },
};
