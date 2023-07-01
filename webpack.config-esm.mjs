import path from 'path';
import CopyPlugin from 'copy-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import pkg from './package.json' assert { type: 'json' };
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import webpack from 'webpack';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import ora from 'ora';

const banner = `/*
 * ${pkg.name}
 * ${pkg.description}
 * v${pkg.version}
 * ${pkg.license} License
 */
`;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const spinner = ora('Loading unicorns').start();

const distPath = path.resolve(__dirname, 'dist');

export default {
  entry: './src/react-chrono.ts',
  experiments: {
    outputModule: true,
  },
  externals: {
    react: 'react',
    'react-dom': 'react-dom',
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
              presets: [
                // '@babel/preset-env',
                ['@babel/preset-react', { runtime: 'automatic' }],
              ],
            },
          },
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.json',
            },
          }
          // {
          //   loader: 'esbuild-loader',
          //   options: {
          //     format: 'esm',
          //     loader: 'tsx',
          //   },
          // },
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
        extractComments: false,
        terserOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true,
          },
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
      raw: true,
    }),
    new webpack.ProgressPlugin({
      activeModules: false,
      entries: true,
      handler: (percentage, message, ...args) => {
        spinner.color = 'yellow';
        spinner.text = `${Math.round(percentage)}% - ${message}...`;
      },
    }),
    function () {
      this.hooks.done.tap('BuildDoneCallback', () => {
        spinner.succeed('Done!');
      });
    },
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
  },
};
