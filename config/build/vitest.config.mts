import path from 'node:path';
import { fileURLToPath } from 'node:url';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import tsconfigPaths from 'vite-tsconfig-paths';

import { cssescDistPath } from '../style/cssesc-path.mjs';

const configDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(configDir, '../..');
const vanillaExtractDir = path.resolve(rootDir, 'node_modules/@vanilla-extract/css');

const vanillaExtractAlias = (subpath: string, distFile: string) => ({
  find: `@vanilla-extract/css/${subpath}`,
  replacement: path.resolve(vanillaExtractDir, `${subpath}/dist/${distFile}`),
});

const vanillaExtractRootAlias = {
  find: /^@vanilla-extract\/css$/,
  replacement: path.resolve(vanillaExtractDir, 'dist/vanilla-extract-css.cjs.js'),
};

export default defineConfig({
  root: rootDir,
  plugins: [
    vanillaExtractPlugin({ identifiers: 'debug' }),
    react({
      include: '**/*.{jsx,tsx}',
    }),
    tsconfigPaths({
      projects: [path.resolve(rootDir, 'tsconfig.json')],
    }),
  ],
  resolve: {
    alias: [
      {
        find: /^cssesc$/,
        replacement: path.resolve(configDir, '../style/cssesc-wrapper.js'),
      },
      {
        find: 'cssesc/cssesc.js',
        replacement: cssescDistPath,
      },
      vanillaExtractRootAlias,
      vanillaExtractAlias('adapter', 'vanilla-extract-css-adapter.cjs.js'),
      vanillaExtractAlias('fileScope', 'vanilla-extract-css-fileScope.cjs.js'),
      vanillaExtractAlias(
        'functionSerializer',
        'vanilla-extract-css-functionSerializer.cjs.js',
      ),
      vanillaExtractAlias('injectStyles', 'vanilla-extract-css-injectStyles.cjs.js'),
      vanillaExtractAlias(
        'disableRuntimeStyles',
        'vanilla-extract-css-disableRuntimeStyles.cjs.js',
      ),
      vanillaExtractAlias('transformCss', 'vanilla-extract-css-transformCss.cjs.js'),
      vanillaExtractAlias('recipe', 'vanilla-extract-css-recipe.cjs.js'),
    ],
  },
  envDir: configDir,
  test: {
    globals: true,
    environment: 'jsdom',
    include: [
      'src/**/*.{test,spec}.{ts,tsx,cts,mts,js,jsx}',
      'benchmark-tests/**/*.{test,spec}.{ts,tsx,cts,mts,js,jsx}',
    ],
    setupFiles: [path.resolve(rootDir, 'src/test-setup.js')],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
});

