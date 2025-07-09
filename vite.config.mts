import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    // Base public path when served in development or production
    base: '/',

    // Root directory of the project
    root: process.cwd(),

    // Public directory to serve static assets
    publicDir: 'public',

    // Build configuration
    build: {
      // Output directory for build files
      outDir: 'dist_site',
      
      // Source maps for better debugging
      sourcemap: mode === 'development',
      
      // Minify configuration
      minify: mode === 'production' ? 'esbuild' : false,
      
      // Rollup options for advanced build configuration
      rollupOptions: {
        // External dependencies that should not be bundled
        external: [],
        
        // Output configuration
        output: {
          // Manual chunks for better caching
          manualChunks: {
            // Vendor chunk for third-party libraries
            vendor: ['react', 'react-dom'],
            // Styled-components chunk
            styled: ['styled-components'],
            // Utils chunk
            utils: ['dayjs', 'classnames', 'focus-visible'],
          },
          
          // Asset file naming
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name?.split('.') || [];
            const ext = info[info.length - 1];
            if (/\.(css)$/.test(assetInfo.name || '')) {
              return `assets/css/[name]-[hash][extname]`;
            }
            if (/\.(png|jpe?g|gif|svg|webp|ico)$/.test(assetInfo.name || '')) {
              return `assets/images/[name]-[hash][extname]`;
            }
            if (/\.(woff2?|eot|ttf|otf)$/.test(assetInfo.name || '')) {
              return `assets/fonts/[name]-[hash][extname]`;
            }
            return `assets/[name]-[hash][extname]`;
          },
          
          // Chunk file naming
          chunkFileNames: 'assets/js/[name]-[hash].js',
          
          // Entry file naming
          entryFileNames: 'assets/js/[name]-[hash].js',
        },
      },
      
      // Target environment
      target: 'esnext',
      
      // CSS code splitting
      cssCodeSplit: true,
      
      // Report compressed size
      reportCompressedSize: true,
      
      // Chunk size warning limit
      chunkSizeWarningLimit: 1000,
      
      // Empty outDir on each build
      emptyOutDir: true,
    },

    // Development server configuration
    server: {
      // Port for development server
      port: 4444,
      
      // Host configuration
      host: true,
      
      // Open browser automatically
      open: true,
      
      // HTTPS configuration (optional)
      // https: true,
      
      // CORS configuration
      cors: true,
      
      // Proxy configuration for API calls
      proxy: {
        // Example proxy configuration
        // '/api': {
        //   target: 'http://localhost:3000',
        //   changeOrigin: true,
        //   secure: false,
        // },
      },
      
      // Watch configuration
      watch: {
        // Ignored files and directories
        ignored: [
          '**/node_modules/**',
          '**/dist/**',
          '**/build/**',
          '**/coverage/**',
          '**/.git/**',
          '**/public/**',
          '**/package.json',
          '**/package-lock.json',
          '**/pnpm-lock.yaml',
          '**/yarn.lock',
          '**/tsconfig.json',
          '**/vite.config.*',
          '**/vitest.config.*',
          '**/cypress/**',
          '**/readme-assets/**',
        ],
        
        // Use polling for file watching (useful in some environments)
        usePolling: false,
      },
      
      // Middleware for custom server behavior
      // middlewareMode: true,
    },

    // Preview server configuration (for testing production build)
    preview: {
      port: 4444,
      host: true,
      open: true,
    },

    // Plugin configuration
    plugins: [
      // React plugin with modern configuration
      react({
        // Fast refresh configuration
        fastRefresh: true,
        
        // JSX runtime configuration
        jsxRuntime: 'automatic',
        
        // Babel configuration
        babel: {
          // Babel plugins
          plugins: [
            // Styled-components plugin for better debugging
            ['babel-plugin-styled-components', {
              displayName: mode === 'development',
              fileName: mode === 'development',
              pure: true,
            }],
          ],
        },
      }),
      
      // TypeScript paths plugin
      tsconfigPaths(),
    ],

    // Module resolution configuration
    resolve: {
      // Alias configuration (matching TypeScript paths)
      alias: {
        '@': resolve(__dirname, './src'),
        '@components': resolve(__dirname, './src/components'),
        '@models': resolve(__dirname, './src/models'),
        '@utils': resolve(__dirname, './src/utils'),
        '@hooks': resolve(__dirname, './src/hooks'),
        '@effects': resolve(__dirname, './src/effects'),
        '@styles': resolve(__dirname, './src/styles'),
        '@types': resolve(__dirname, './src/types'),
        '@demo': resolve(__dirname, './src/demo'),
        '@examples': resolve(__dirname, './src/examples'),
      },
      
      // File extensions to resolve
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
    },

    // CSS configuration
    css: {
      // PostCSS configuration will be handled by postcss.config.js
      // This allows for better compatibility with existing setups
      
      // CSS modules configuration
      modules: {
        // Generate scoped class names
        generateScopedName: mode === 'development' 
          ? '[name]__[local]___[hash:base64:5]'
          : '[hash:base64:8]',
      },
      
      // Preprocessor options
      preprocessorOptions: {
        scss: {
          // Global SCSS variables (if you have them)
          // additionalData: `@import "./src/styles/variables.scss";`,
        },
      },
    },

    // Optimize dependencies configuration
    optimizeDeps: {
      // Force pre-bundling of these dependencies
      include: [
        'react',
        'react-dom',
        'styled-components',
        'dayjs',
        'classnames',
        'focus-visible',
        'use-debounce',
        'xss',
      ],
      
      // Exclude dependencies from pre-bundling
      exclude: [
        // Add any problematic dependencies here
      ],
      
      // Force dependency optimization
      force: false,
    },

    // Define global constants
    define: {
      // Global constants
      __DEV__: mode === 'development',
      __PROD__: mode === 'production',
      __TEST__: mode === 'test',
      
      // Environment variables
      'process.env.NODE_ENV': JSON.stringify(mode),
      
      // Global variables for styled-components
      global: 'globalThis',
    },

    // Worker configuration
    worker: {
      // Worker plugins
      plugins: [],
      
      // Worker format
      format: 'es',
    },

    // Log level
    logLevel: mode === 'development' ? 'info' : 'warn',

    // Clear screen on restart
    clearScreen: false,

    // Environment variables
    envPrefix: 'VITE_',

    // Custom configuration based on mode
    ...(mode === 'development' && {
      // Development-specific configurations
      build: {
        sourcemap: true,
        minify: false,
      },
    }),

    ...(mode === 'production' && {
      // Production-specific configurations
      build: {
        sourcemap: false,
        minify: 'esbuild',
        rollupOptions: {
          output: {
            manualChunks: {
              vendor: ['react', 'react-dom'],
              styled: ['styled-components'],
              utils: ['dayjs', 'classnames', 'focus-visible'],
            },
          },
        },
      },
    }),
  };
});
