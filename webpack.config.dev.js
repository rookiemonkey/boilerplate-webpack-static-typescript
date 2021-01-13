const { merge } = require("webpack-merge");
const common = require('./webpack.config.common');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(common, {

    mode: 'development',

    devtool: 'eval-source-map',

    optimization: {
        minimize: false,
        minimizer: [
            new TerserPlugin({
                cache: true,
                parallel: true,
                sourceMap: false,
                extractComments: false,
                terserOptions: {
                    // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
                    comments: false,
                }
            })
        ]
    },

});