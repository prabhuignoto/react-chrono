import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import _import from 'eslint-plugin-import';
import react from 'eslint-plugin-react';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import jsxA11Y from 'eslint-plugin-jsx-a11y';
import typescriptSortKeys from 'eslint-plugin-typescript-sort-keys';
import sortKeysFix from 'eslint-plugin-sort-keys-fix';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  allConfig: js.configs.all,
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

export default [
  {
    ignores: ['src/demo/*', 'src/assets/*', 'src/examples/*', 'coverage/**', 'dist/**', 'build/**'],
  },
  ...fixupConfigRules(
    compat.extends(
      'plugin:import/typescript',
      'plugin:react/recommended',
      'prettier',
      'plugin:react/jsx-runtime',
    ),
  ),
  {
    languageOptions: {
      ecmaVersion: 12,

      globals: {
        ...globals.browser,
      },
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      sourceType: 'module',
    },

    plugins: {
      '@typescript-eslint': typescriptEslint,
      import: fixupPluginRules(_import),
      'jsx-a11y': jsxA11Y,
      react: fixupPluginRules(react),
      'sort-keys-fix': sortKeysFix,
      'typescript-sort-keys': typescriptSortKeys,
    },

    rules: {
      'sort-keys-fix/sort-keys-fix': 'error',
      'typescript-sort-keys/interface': 'error',
      'typescript-sort-keys/string-enum': 'error',
      'no-unused-vars': "error",
      "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }]
      // 'no-restricted-imports': [
      //   'error',
      //   {
      //     paths: [
      //       {
      //         name: 'styled-components',
      //         message: 'Use vanilla-extract instead. If this is a legacy file, add a file-level disable comment and include a migration note.',
      //       },
      //     ],
      //     patterns: ['styled-components/*'],
      //   },
      // ],
    },

    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
