import babel from "@rollup/plugin-babel";
import buble from "@rollup/plugin-buble";
import common from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import cssnano from "cssnano";
import postcss from "rollup-plugin-postcss"
import pkg from "./package.json";
import { terser } from "rollup-plugin-terser";

const banner = `/*
 * ${pkg.name}
 * ${pkg.description}
 * v${pkg.version}
 * ${pkg.license} License
 */
`;

export default {
  input: 'src/react-chrono.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      strict: true,
      banner,
    },
    {
      file: pkg.module,
      format: 'es',
      exports: 'named',
      strict: true,
      banner,
    },
    {
      file: pkg.umd,
      format: 'umd',
      exports: 'named',
      strict: true,
      banner,
      name: 'ReactChrono',
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
      },
    },
  ],
  plugins: [
    typescript(),
    babel({
      extensions: ['tsx', 'ts'],
      babelHelpers: 'runtime',
      plugins: [
        '@babel/plugin-transform-runtime',
        '@babel/plugin-proposal-optional-chaining',
        [
          '@emotion',
          {
            // sourceMap is on by default but source maps are dead code eliminated in production
            sourceMap: false,
          },
        ],
      ],
    }),
    buble({
      objectAssign: true,
      transforms: {
        templateString: false,
      },
    }),
    postcss({
      plugins: [
        cssnano({
          preset: 'default',
        }),
      ],
    }),
    common(),
    resolve(),
    terser({
      compress: {
        drop_debugger: true,
        drop_console: true,
      },
      format: {
        comments: false,
      }
    }),
  ],
  external: ['react', 'react-dom', '@babel/runtime'],
};
