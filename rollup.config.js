import esbuild from "rollup-plugin-esbuild";
import resolve from "rollup-plugin-node-resolve";
import progress from "rollup-plugin-progress";
import pkg from "./package.json";

const banner = `/*
 * ${pkg.name}
 * ${pkg.description}
 * v${pkg.version}
 * ${pkg.license} License
 */
`;

export default {
  input: "src/components/react-crono.tsx",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      exports: "named",
      strict: true,
      banner,
    },
    {
      file: pkg.module,
      format: "es",
      exports: "named",
      strict: true,
      banner,
    },
  ],
  plugins: [
    progress({
      clearLine: false, // default: true
    }),
    resolve(),
    esbuild({
      include: /\.[jt]sx?$/,
      target: "esnext",
      minify: true
    }),
  ],
  external: [
    "react",
    "react-dom",
    "nanoid",
    "use-debounce",
    "styled-components",
  ],
};
