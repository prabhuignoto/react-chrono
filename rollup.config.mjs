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

const pkg = JSON.parse(fs.readFileSync('./package.json'));

const banner = `/*
 * ${pkg.name}
 * ${pkg.description}
 * v${pkg.version}
 * ${pkg.license} License
 */
`;

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
    },
    {
      banner,
      exports: 'named',
      file: pkg.module,
      format: 'es',
      strict: true,
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
    },
  ],
  plugins: [
    PeerDepsExternalPlugin(),
    del({ targets: 'dist/*' }),
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
          },
        ],
      ],
    }),
    postcss({
      plugins: [
        postCSSPreset({
          features: {
            'nesting-rules': true,
          },
          stage: 0,
        }),
        autoprefixer(),
        cssnano({
          preset: 'default',
        }),
      ],
    }),
    common(),
    resolve({
      browser: true,
    }),
    filesize({
      showBrotliSize: true,
      showGzippedSize: true,
      showMinifiedSize: true,
    }),
    visualizer({
      emitFile: true,
      filename: 'dist/stats.html',
    }),
    terser({
      compress: {
        drop_console: true,
        drop_debugger: true,
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
