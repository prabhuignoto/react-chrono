module.exports = {
  env: {
    browser: true,
    es2023: true,
  },
  extends: [
    'plugin:import/typescript',
    'plugin:react/recommended',
    'prettier',
    'plugin:react/jsx-runtime',
    // 'eslint:recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'import',
    'react',
    '@typescript-eslint',
    'jsx-a11y',
    'typescript-sort-keys',
    'sort-keys-fix',
  ],
  rules: {
    // 'import/no-unused-modules': [
    //   1,
    //   {
    //     unusedExports: true,
    //   },
    // ],
    'sort-keys-fix/sort-keys-fix': 'error',
    'typescript-sort-keys/interface': 'error',
    'typescript-sort-keys/string-enum': 'error',
  },
  settings: {
    react: {
      version: '18.1.0',
    },
  },
};
