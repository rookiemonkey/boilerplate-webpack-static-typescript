const path = require('path');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    mode: 'development',

    // use 'source-map' for production
    devtool: 'eval-source-map',

    // main entry file
    entry: {
        main: path.resolve(__dirname, "./src/index.ts"),
    },

    resolve: {
        extensions: [".wasm", ".ts", ".tsx", ".mjs", ".cjs", ".js", ".json"],
    },

    output: {
        publicPath: "build",
        path: path.resolve(__dirname, "build"),
        filename: '[name].[contenthash].bundle.js'
    },

    plugins: [
        new CleanWebpackPlugin()
    ],

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                include: [path.resolve(__dirname, 'src')]
                // include: is the location of ts files
                // overrides the outDir, rootDir, and include, in tsconfig.json
            }
        ]
    }
};