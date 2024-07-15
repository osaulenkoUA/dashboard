const { configs } = require('eslint-plugin-prettier');

module.exports = [
  {
    languageOptions: {
      ecmaVersion: 12,
      sourceType: 'module',
      globals: {
        window: 'readonly',
        document: 'readonly',
      },
    },
    plugins: {
      prettier: require('eslint-plugin-prettier'),
    },
    rules: {
      ...configs.recommended.rules,
      'prettier/prettier': 'error',
      'no-multiple-empty-lines': ['error', { max: 1 }],
    },
  },
];
