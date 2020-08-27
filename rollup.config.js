import typescript from "@rollup/plugin-typescript";
import filesize from "rollup-plugin-filesize";
import resolve from "rollup-plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
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
  plugins: [resolve(), typescript(), terser(), filesize()],
  external: [
    "react",
    "react-dom",
    "nanoid",
    "use-debounce",
    "styled-components",
  ],
};
