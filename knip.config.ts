import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  entry: [
    'src/react-chrono.ts', // Main library entry point
    'src/index.tsx', // Demo app entry point
  ],
  project: ['src/**/*.{ts,tsx}', '!src/**/*.test.{ts,tsx}', '!src/**/*.spec.{ts,tsx}'],
  ignore: [
    // Test files
    '**/*.test.ts',
    '**/*.test.tsx',
    '**/*.spec.ts',
    '**/*.spec.tsx',
    '**/__tests__/**',
    '**/tests/**',
    '**/test/**',
    '**/benchmark-tests/**',
    // Configuration files
    '**/*.config.ts',
    '**/*.config.js',
    '**/*.config.mts',
    '**/*.config.mjs',
    '**/config/**',
    '**/tsconfig*.json',
    '**/playwright.config.ts',
    '**/vitest.config.*',
    '**/vite.config.*',
    '**/eslint.config.*',
    '**/stylelint.config.*',
    '**/knip.config.ts',
    // Other config-related files
    '**/setup.sh',
    '**/test-setup.js',
    '**/test-utils/**',
  ],
  ignoreDependencies: [
    // Storybook dependencies
    '@storybook/addon-docs',
    '@storybook/addon-themes',
    '@storybook/react-vite',
    'storybook',
    'chromatic',
    // Testing dependencies
    '@playwright/test',
    '@playwright/experimental-ct-react',
    '@testing-library/dom',
    '@testing-library/jest-dom',
    '@testing-library/react',
    '@testing-library/user-event',
    '@vitest/coverage-v8',
    '@vitest/ui',
    'vitest',
    'jsdom',
    // Build tools
    '@size-limit/preset-big-lib',
    'size-limit',
    'rollup-plugin-visualizer',
    // Dev tools
    'prettier',
    'eslint',
    'eslint-config-prettier',
    'eslint-plugin-import',
    'eslint-plugin-jsx-a11y',
    'eslint-plugin-react',
    'eslint-plugin-sort-keys-fix',
    'eslint-plugin-storybook',
    'eslint-plugin-typescript-sort-keys',
    '@typescript-eslint/eslint-plugin',
    '@typescript-eslint/parser',
    'stylelint',
    'stylelint-config-recess-order',
    'stylelint-config-recommended',
    'stylelint-order',
    'snyk',
    'dotenv-cli',
    // Type definitions
    '@types/node',
    '@types/react',
    '@types/react-dom',
    '@types/react-router-dom',
  ],
  ignoreBinaries: ['playwright', 'chromatic'],
};

export default config;

