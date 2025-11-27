import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';

const baseDirectory = fileURLToPath(new URL('.', import.meta.url));
const projectRoot = path.resolve(baseDirectory, '../..');

const compat = new FlatCompat({
  baseDirectory,
  resolvePluginsRelativeTo: projectRoot,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: ['node_modules/**', 'dist/**', 'coverage/**', 'storybook-static/**'],
  },
  ...compat.config({
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:jsx-a11y/recommended',
      'plugin:storybook/recommended',
      'prettier',
    ],
    env: {
      browser: true,
      es2024: true,
      node: true,
    },
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'react/prop-types': 'off',
    },
  }),
];

