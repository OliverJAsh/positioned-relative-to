import * as pathHelpers from 'path';
import * as TerserPlugin from 'terser-webpack-plugin';
import { Configuration } from 'webpack';

// Expect `__dirname` to be `/config/target/`.
const ROOT_PATH = pathHelpers.resolve(__dirname, '..', '..');
const TARGET_PATH = pathHelpers.join(ROOT_PATH, './target/');
const SRC_PATH = pathHelpers.join(ROOT_PATH, './src/');

const ENTRY_FILENAME = 'index.ts';
const OUTPUT_FILENAME = 'index.js';

const RESOLVED_EXTENSIONS = [
    // start defaults
    '.js',
    '.json',
    // end defaults
    '.ts',
    '.tsx',
];

const config: Configuration = {
    mode: 'production',
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    mangle: false,
                    output: {
                        beautify: true,
                    },
                },
            }),
        ],
    },
    entry: pathHelpers.resolve(SRC_PATH, ENTRY_FILENAME),
    output: {
        path: TARGET_PATH,
        filename: OUTPUT_FILENAME,
    },
    resolve: {
        extensions: RESOLVED_EXTENSIONS,
    },
    module: {
        rules: [{ test: /\.tsx?$/, loader: 'ts-loader' }],
    },
};

export default config;
