const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const pkg = require('./package.json');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const webpack = require('webpack');

const banner = `/*
 * ${pkg.name}
 * ${pkg.description}
 * v${pkg.version}
 * ${pkg.license} License
 */
`;

const distPath = path.resolve(__dirname, 'dist');

module.exports = {
  entry: './src/react-chrono.ts',
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
            },
          },
          {
            loader: 'esbuild-loader',
            options: {
              format: 'esm',
              loader: 'tsx',
              tsconfigRaw: require('./tsconfig.cjs.json'),
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
    filename: `${pkg.name}.js`,
    library: {
      type: 'commonjs2',
    },
    libraryTarget: 'commonjs2',
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
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
  },
};
