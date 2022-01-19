module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:import/typescript', 'plugin:react/recommended', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'jsx-a11y',
    'typescript-sort-keys',
    'sort-keys-fix',
  ],
  rules: {
    'sort-keys-fix/sort-keys-fix': 'error',
    'typescript-sort-keys/interface': 'error',
    'typescript-sort-keys/string-enum': 'error',
  },
  settings: {
    react: {
      version: 'latest',
    },
  },
};
