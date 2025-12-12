import react from '@vitejs/plugin-react';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import dts from 'vite-plugin-dts';
import tsconfig from 'vite-tsconfig-paths';
import { defineConfig } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';
import path from 'path';
import { createRequire } from 'node:module';
import { cssescDistPath } from '../style/cssesc-path.mjs';

const require = createRequire(import.meta.url);
const postcssConfig = require('../style/postcss.config.js');

const vanillaExtractDir = path.resolve(
  __dirname,
  '../../node_modules/@vanilla-extract/css',
);
const vanillaExtractAlias = (subpath: string, distFile: string) => ({
  find: `@vanilla-extract/css/${subpath}`,
  replacement: path.resolve(vanillaExtractDir, `${subpath}/dist/${distFile}`),
});
const vanillaExtractRootAlias = {
  find: /^@vanilla-extract\/css$/,
  replacement: path.resolve(
    vanillaExtractDir,
    'dist/vanilla-extract-css.cjs.js',
  ),
};

export default defineConfig(({ mode }) => {
  const shouldBuildTypes = mode === 'production' || process.env.BUILD_TYPES === 'true';
  const enableSourceMap = process.env.SOURCE_MAP === 'true';

  return {
    publicDir: false,
    plugins: [
      vanillaExtractPlugin({
        identifiers: mode === 'production' ? 'short' : 'debug',
      }),
      react({
        include: '**/*.{jsx,tsx}',
        babel: {
          plugins: mode === 'production' ? ['babel-plugin-jsx-remove-data-test-id'] : [],
        },
      }),
      tsconfig(),
      shouldBuildTypes &&
        dts({
          entryRoot: 'src',
          tsconfigPath: 'tsconfig.build.json',
          outDir: 'dist/types',
          insertTypesEntry: true,
          skipDiagnostics: true,
          rollupTypes: false,
          compilerOptions: {
            skipLibCheck: true,
          },
          exclude: [
            'src/demo/**',
            'src/examples/**',
            'src/**/__tests__/**',
            'src/**/*.test.*',
            'src/**/*.spec.*',
            'src/**/*.stories.*',
            'src/test-setup.js',
            'src/index.tsx',
            'src/styles/types.ts',
          ],
        }),
      mode === 'production' &&
        visualizer({
          filename: 'dist/stats.html',
          template: 'treemap',
          gzipSize: true,
          brotliSize: true,
        }),
    ],
    build: {
      lib: {
        entry: 'src/react-chrono.ts',
        name: 'ReactChronoUI',
        formats: ['es', 'cjs'],
        fileName: (format) => (format === 'es' ? 'index.esm.js' : 'index.cjs'),
      },
      target: 'es2022',
      sourcemap: enableSourceMap,
      minify: mode === 'production' ? 'esbuild' : false,
      ...(mode === 'production' && {
        esbuild: {
          drop: ['console', 'debugger'],
          legalComments: 'none',
        },
      }),
      cssMinify: mode === 'production',
      cssCodeSplit: false,
      rollupOptions: {
        external: (id) =>
          id === 'react' ||
          id === 'react-dom' ||
          id.startsWith('react/') ||
          id.startsWith('react-dom/') ||
          /\.(svg|mp4|webm|png|jpe?g|gif)$/i.test(id),
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
          },
          chunkFileNames: 'chunks/[name]-[hash].js',
          assetFileNames: (assetInfo) => {
            if (assetInfo.name && assetInfo.name.endsWith('.css')) {
              return 'style.css';
            }
            return 'assets/[name]-[hash][extname]';
          },
          generatedCode: {
            preset: 'es2015',
            arrowFunctions: true,
            constBindings: true,
            objectShorthand: true,
          },
          interop: 'auto',
          exports: 'named',
          preserveModules: false,
          manualChunks: undefined,
          compact: mode === 'production',
          minifyInternalExports: mode === 'production',
        },
        treeshake: {
          moduleSideEffects: 'no-external',
          propertyReadSideEffects: false,
          tryCatchDeoptimization: false,
        },
      },
      outDir: 'dist',
      emptyOutDir: true,
    },
    resolve: {
      alias: [
        {
          find: /^cssesc$/,
          replacement: path.resolve(__dirname, '../style/cssesc-wrapper.js'),
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
    css: {
      postcss: postcssConfig,
    },
  };
});
