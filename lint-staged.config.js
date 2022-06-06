module.exports = {
  // eslint格式化代码
  '{client,server}/**/*.{js,jsx}': (filenames) => [`eslint ${filenames.join(' ')}`],
  // stylelint格式化代码
  'client/**/*.{css,scss}': (filenames) => [`stylelint ${filenames.join(' ')}`],
};
