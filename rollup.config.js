import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";

const input = "lib/index.js";

const commonPlugins = [
  resolve({
    browser: true,
  }),
  commonjs(),
];

const outputs = (format) => ({
  format,
  file: `dist/index.${format}.js`,
});

const defaultBabel = () =>
  babel({
    exclude: "node_modules/**",
  });

export default [
  {
    input,
    output: {
      name: "ObjectWatch",
      ...outputs("umd"),
      exports: "default",
    },
    plugins: [...commonPlugins, defaultBabel()],
  },
  {
    input,
    output: {
      ...outputs("cjs"),
      exports: "default",
    },
    plugins: [...commonPlugins, defaultBabel()],
  },
  {
    input,
    output: outputs("esm"),
    plugins: [...commonPlugins],
  },
];
