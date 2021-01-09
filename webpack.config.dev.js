const path = require('path');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

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

    devServer: {
        port: 8080,
        contentBase: path.resolve(__dirname, "build"),
        hot: true
    },

    optimization: {
        minimizer: [
            new OptimizeCssAssetsPlugin(),
            new TerserPlugin(),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, "./src/index.html"),
                minify: {
                    removeAttributeQuotes: true,
                    collapseWhitespace: true,
                    removeComments: true
                }
            })
        ]
    },

    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({ template: path.resolve(__dirname, "./src/index.html") }),
        new MiniCssExtractPlugin({ filename: '[name].[contenthash].bundle.css' })
    ],

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                include: [path.resolve(__dirname, './src')]
                // include: is the location of ts files
                // overrides the outDir, rootDir, and include, in tsconfig.json
            },

            {

                test: /\.html$/,
                loader: "html-loader"
            },

            {
                test: /\.css$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: ''
                    }
                }, {
                    loader: "css-loader"
                }]
            },

            {
                test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'assets/fonts/'
                        }
                    }
                ]
            },


            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name][hash].[ext]',
                            outputPath: 'assets/images/'
                        }
                    }
                ]
            }
        ]
    }
};