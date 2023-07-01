import path from 'path';
import CopyPlugin from 'copy-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import pkg from './package.json' assert { type: 'json' };
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import webpack from 'webpack';
import ora from 'ora';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const spinner = ora('Loading unicorns').start();

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
              presets: [
                '@babel/preset-env',
                ['@babel/preset-react', { runtime: 'automatic' }],
              ],
            },
          },
          {
            loader: 'esbuild-loader',
            options: {
              format: 'cjs',
              loader: 'tsx',
              target: 'es6',
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
    filename: `${pkg.name}.js`,
    library: {
      type: 'commonjs2',
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
