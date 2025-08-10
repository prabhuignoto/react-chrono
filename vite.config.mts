import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import tsconfig from 'vite-tsconfig-paths';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => ({
  publicDir: false,
  plugins: [
    react(),
    tsconfig(),
    dts({
      entryRoot: 'src',
      tsconfigPath: 'tsconfig.json',
      outDir: 'dist/types',
      insertTypesEntry: true,
      skipDiagnostics: true,
      exclude: [
        'src/demo/**',
        'src/examples/**',
        'src/**/__tests__/**',
        'src/**/*.test.*',
        'src/**/*.spec.*',
        'src/test-setup.js',
      ],
    }),
  ],
  build: {
    lib: {
      entry: 'src/react-chrono.ts',
      name: 'ReactChronoUI',
      formats: ['es', 'cjs'],
      fileName: (format) => (format === 'es' ? 'index.esm.js' : 'index.cjs'),
    },
    target: 'es2020',
    sourcemap: true,
    minify: mode === 'production' ? 'esbuild' : false,
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
      },
    },
    outDir: 'dist',
    emptyOutDir: true,
  },
}));
