// https://eslint.org/docs/user-guide/configuring
module.exports = {
  root: true,
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb',
  ],
  settings: {
    'import/resolver': {
      webpack: {
        config: 'bin/webpack/config.base.js',
      },
    },
  },
  rules: {
    'linebreak-style': [0, 'error', 'windows'],
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx'] }],
    'react/function-component-definition': 0,
    'import/no-unresolved': 'off',
    'react/prop-types': 0,
    'react/jsx-props-no-spreading': 'off',
    'jsx-a11y/html-has-lang': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'react/forbid-prop-types': 0,
    'consistent-return': 0,
    'import/prefer-default-export': 'off',
    'react/no-array-index-key': 'off',
    'object-curly-newline': 0,
    'max-len': 0,
    'jsx-a11y/alt-text': 0,
    'import/extensions': 0,
    'no-debugger': 1,
    'import/no-extraneous-dependencies': 0,
    'no-nested-ternary': 0,
    'global-require': 0,
    'no-tabs': 0,
    camelcase: 0,
    'default-param-last': 0,
  },
};
