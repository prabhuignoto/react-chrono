import babel from '@rollup/plugin-babel';
import common from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import fs from 'fs';
import postCSSPreset from 'postcss-preset-env';
import copy from 'rollup-plugin-copy';
import del from 'rollup-plugin-delete';
import filesize from 'rollup-plugin-filesize';
import PeerDepsExternalPlugin from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import typescript from 'rollup-plugin-typescript2';
import { visualizer } from 'rollup-plugin-visualizer';
import alias from '@rollup/plugin-alias';
import dynamicImportVars from '@rollup/plugin-dynamic-import-vars';
import replace from '@rollup/plugin-replace';
import progress from 'rollup-plugin-progress';

const pkg = JSON.parse(fs.readFileSync('./package.json'));

const banner = `/*
 * ${pkg.name}
 * ${pkg.description}
 * v${pkg.version}
 * ${pkg.license} License
 */
`;

const isProduction = process.env.NODE_ENV === 'production';

export default {
  cache: true,
  external: ['react', 'react-dom'],
  input: 'src/react-chrono.ts',
  onwarn(warning) {
    if (warning.code === 'EXPERIMENTAL_WARNING') return;
    console.warn(warning);
  },
  output: [
    {
      banner,
      exports: 'named',
      file: pkg.main,
      format: 'cjs',
      strict: true,
      sourcemap: true,
    },
    {
      banner,
      exports: 'named',
      file: pkg.module,
      format: 'es',
      strict: true,
      sourcemap: true,
    },
    {
      banner,
      exports: 'named',
      file: pkg.umd,
      format: 'umd',
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        'react/jsx-runtime': 'jsxRuntime',
      },
      name: 'ReactChrono',
      strict: true,
      sourcemap: true,
    },
  ],
  plugins: [
    progress({
      clearLine: true,
    }),
    PeerDepsExternalPlugin(),
    del({ targets: 'dist/*' }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      preventAssignment: true,
    }),
    alias({
      entries: [{ find: '@', replacement: './src' }],
    }),
    typescript({
      tsconfig: 'tsconfig.json',
      tsconfigDefaults: {
        compilerOptions: {
          plugins: [
            {
              transform: 'typescript-transform-paths',
            },
            {
              afterDeclarations: true,
              transform: 'typescript-transform-paths',
            },
          ],
        },
      },
      tsconfigOverride: {
        exclude: ['src/demo/**/*', 'src/examples/**/*'],
        include: ['src/**/*.ts+(|x)', 'src/**/*.d.ts+(|x)'],
      },
    }),
    babel({
      babelHelpers: 'runtime',
      extensions: ['tsx', 'ts'],
      plugins: [
        '@babel/plugin-transform-runtime',
        '@babel/plugin-transform-optional-chaining',
        'babel-plugin-jsx-remove-data-test-id',
        [
          'babel-plugin-styled-components',
          {
            fileName: false,
            minify: true,
            ssr: true,
            transpileTemplateLiterals: true,
            displayName: !isProduction,
          },
        ],
      ],
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              browsers: ['last 2 versions', 'not dead'],
            },
            useBuiltIns: 'usage',
            corejs: 3,
          },
        ],
      ],
    }),
    postcss({
      plugins: [
        postCSSPreset({
          features: {
            'nesting-rules': true,
            'custom-media-queries': true,
            'media-query-ranges': true,
          },
          stage: 0,
        }),
        autoprefixer(),
        cssnano({
          preset: [
            'default',
            {
              discardComments: { removeAll: true },
            },
          ],
        }),
      ],
      minimize: isProduction,
      sourceMap: true,
    }),
    common(),
    resolve({
      browser: true,
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
    dynamicImportVars(),
    filesize({
      showBrotliSize: true,
      showGzippedSize: true,
      showMinifiedSize: true,
    }),
    visualizer({
      emitFile: true,
      filename: 'dist/stats.html',
      template: 'treemap',
    }),
    terser({
      compress: {
        drop_console: isProduction,
        drop_debugger: isProduction,
        pure_funcs: ['console.log'],
      },
      format: {
        comments: false,
      },
    }),
    copy({
      targets: [{ dest: 'dist', src: 'README.md' }],
    }),
  ],
};
