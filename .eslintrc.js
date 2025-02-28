module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': 'off',
    'linebreak-style': [
      'error', 'windows',
    ],
    'no-underscore-dangle': 'off',
    camelcase: 'off',
  },
};
