import path from 'path';
import CopyPlugin from 'copy-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import pkg from './package.json' assert { type: 'json' };
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import webpack from 'webpack';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const distPath = path.resolve(__dirname, 'dist');

const banner = `/*
 * ${pkg.name}
 * ${pkg.description}
 * v${pkg.version}
 * ${pkg.license} License
 */
`;

export default {
  entry: './src/react-chrono.ts',
  experiments: {
    outputModule: true,
  },
  externals: {
    react: {
      amd: 'react',
      commonjs: 'react',
      commonjs2: 'react',
      module: 'react',
      root: '_',
    },
    'react-dom': {
      amd: 'react-dom',
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      module: 'react-dom',
      root: '_',
    },
  },
  mode: 'production',
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.(ts|tsx|jsx|js)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: [
                '@babel/plugin-transform-runtime',
                '@babel/plugin-proposal-optional-chaining',
                [
                  'babel-plugin-styled-components',
                  { displayName: false, fileName: false, ssr: true },
                ],
              ],
            },
          },
          {
            loader: 'esbuild-loader',
            options: {
              format: 'esm',
              loader: 'tsx',
              target: 'esnext',
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                    {
                      features: {
                        'nesting-rules': true,
                      },
                      stage: 0,
                    },
                  ],
                  'autoprefixer',
                  ['cssnano', { preset: 'default' }],
                ],
              },
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true,
          },
          // extractComments: false,
          format: {
            comments: false,
          },
        },
      }),
    ],
  },
  output: {
    environment: {
      module: true,
    },
    filename: `${pkg.name}.mjs`,
    library: {
      type: 'module',
    },
    path: distPath,
  },
  performance: {
    hints: false,
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: 'README.md', to: distPath }],
    }),
    new webpack.BannerPlugin({
      banner,
      raw: false,
    }),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
  },
};
