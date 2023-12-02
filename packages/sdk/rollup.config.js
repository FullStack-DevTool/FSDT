const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const ts = require('rollup-plugin-ts');
// const buildType = process.env.BUILD_TYPE || 'node';

module.exports = [
  // {
  //   // UMD
  //   input: "src/index.ts",
  //   plugins: [
  //     commonjs(),
  //     resolve(),
  //     babel({
  //       babelHelpers: "bundled",
  //     }),
  //     terser(),
  //     ts(),
  //     nodePolyfills()
  //   ],
  //   output: {
  //     file: `dist/index.min.js`,
  //     format: "umd",
  //     name: "fullstackDevtoolSdk",
  //     esModule: false,
  //     exports: "named",
  //     sourcemap: true,
  //   },
  // },
  {
    input: 'src/index.ts', // Adjust the entry point based on your project structure
    output: [
      {
        file: `dist/index.cjs.js`,
        format: 'cjs',
        sourcemap: false,
        inlineDynamicImports: true,
      },
      {
        file: `dist/index.esm.js`,
        format: 'esm',
        sourcemap: false,
        inlineDynamicImports: true,
      },
    ],
    external: [/node_modules/],
    // external: [ /^node:/],
    plugins: [
      resolve(), // Use the rollup-plugin-node-resolve to resolve dependencies
      commonjs(),
      ts({}),
    ],
  },
];
