// import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import { defineConfig } from "rollup";
import { terser } from "rollup-plugin-terser";
import ts from "rollup-plugin-ts";
import rollupExternalModules from "rollup-external-modules";
const terserplugin = terser({
    compress: {
        ecma: 2015,
        toplevel: true,
        unused: true,

        drop_debugger: true,
    },
    module: true,
    mangle: true,
    output: { comments: false, beautify: true },
});
// const external = [
//     "@masx200/async-task-current-limiter",
//     "@masx200/mini-cli-args-parser",
//     "btoa",
//     "fs-extra",
//     "node-fetch",
//     "cookie",
// ];
const banner = `#!/usr/bin/env node`;
export default defineConfig([
    {
        external: rollupExternalModules,
        input: "lib/index.ts",
        output: [
            { sourcemap: true, file: "./dist/index.js", format: "esm" },
            { sourcemap: true, file: "./dist/index.cjs", format: "cjs" },
        ],
        plugins: [
            resolve(),
            commonjs(),
            ts({ transpiler: "typescript" }),
            terserplugin,
        ],
    },
    {
        external: rollupExternalModules,
        input: "lib/cli.ts",
        output: [
            {
                banner,
                sourcemap: true,
                file: "./dist/cli.js",
                format: "esm",
            },
        ],
        plugins: [
            resolve(),
            commonjs(),
            ts({ transpiler: "typescript" }),
            terserplugin,
        ],
    },
]);
