const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require("@rollup/plugin-commonjs");
const ts = require("rollup-plugin-ts");

module.exports = [
  {
   input: 'src/index.ts', // Adjust the entry point based on your project structure
   output: [
      // If the app using this library supports esmodules, it will use the esm build, otherwise cjs build will be used.
      {
        file: "dist/index.cjs.js",
        format: "cjs",
        sourcemap: false,
      },
      {
        file: "dist/index.esm.js",
        format: "esm",
        sourcemap: false,
      },
    ],
  plugins: [
    resolve(), // Use the rollup-plugin-node-resolve to resolve dependencies
    commonjs(),
    ts({})
    // typescript({
    //   rollupCommonJSResolveHack: false,
    //   clean: true,
    // }),
    // Add other plugins as needed
  ],
},
]