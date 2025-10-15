import react from '@vitejs/plugin-react';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import dts from 'vite-plugin-dts';
import tsconfig from 'vite-tsconfig-paths';
import { defineConfig } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig(({ mode }) => ({
  publicDir: false,
  plugins: [
    vanillaExtractPlugin({
      identifiers: mode === 'production' ? 'short' : 'debug',
    }),
    react(),
    tsconfig(),
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
    mode === 'production' && visualizer({
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
    sourcemap: true,
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
        id === 'styled-components' ||
        id.startsWith('react/') ||
        id.startsWith('react-dom/') ||
        id.startsWith('styled-components/') ||
        /\.(svg|mp4|webm|png|jpe?g|gif)$/i.test(id),
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'styled-components': 'styled',
        },
        chunkFileNames: 'chunks/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          // Use static filename for CSS to allow easier importing
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
}));
