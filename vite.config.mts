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
      exclude: [
        'src/demo/**',
        'src/examples/**',
        'src/**/__tests__/**',
        'src/**/*.test.*',
        'src/**/*.spec.*',
        'src/**/*.stories.*',
        'src/test-setup.js',
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
    minify: mode === 'production' ? 'terser' : false,
    terserOptions: mode === 'production' ? {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
        passes: 2,
      },
      mangle: {
        safari10: true,
      },
      format: {
        comments: false,
        ecma: 2022,
      },
    } : undefined,
    cssMinify: mode === 'production',
    cssCodeSplit: false,
    rollupOptions: {
      external: (id) =>
        ['react', 'react-dom', 'styled-components'].includes(id) ||
        /\.(svg|mp4|webm|png|jpe?g|gif)$/i.test(id),
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'styled-components': 'styled',
        },
        chunkFileNames: 'chunks/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
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
