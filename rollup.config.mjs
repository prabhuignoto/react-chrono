import babel from '@rollup/plugin-babel';
// import buble from '@rollup/plugin-buble';
import common from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import postCSSPreset from 'postcss-preset-env';
import analyze from 'rollup-plugin-analyzer';
import copy from 'rollup-plugin-copy';
import del from 'rollup-plugin-delete';
import PeerDepsExternalPlugin from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json' assert { type: 'json' };

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
      tsconfigOverride: {
        include: ['src/**/*.ts+(|x)', 'src/**/*.d.ts+(|x)'],
        exclude: ['src/demo/**/*', 'src/examples/**/*'],
      },
      tsconfigDefaults: {
        compilerOptions: {
          plugins: [
            {
              transform: 'typescript-transform-paths',
            },
            {
              transform: 'typescript-transform-paths',
              afterDeclarations: true,
            },
          ],
        },
      },
    }),
    babel({
      babelHelpers: 'runtime',
      extensions: ['tsx', 'ts'],
      plugins: [
        '@babel/plugin-transform-runtime',
        '@babel/plugin-proposal-optional-chaining',
        [
          'babel-plugin-styled-components',
          {
            fileName: false,
            ssr: true,
            transpileTemplateLiterals: true,
            minify: true,
          },
        ],
      ],
    }),
    // buble({
    //   objectAssign: true,
    //   transforms: {
    //     templateString: false,
    //   },
    // }),
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
    terser({
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
      format: {
        comments: false,
      },
    }),
    analyze({
      summaryOnly: true,
    }),
    copy({
      targets: [{ dest: 'dist', src: 'README.md' }],
    }),
  ],
};
