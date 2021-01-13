const { merge } = require("webpack-merge");
const common = require('./webpack.config.common');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(common, {

    mode: 'production',

    devtool: 'source-map',

    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                cache: true,
                parallel: true,
                sourceMap: true,
                extractComments: false,
                terserOptions: {
                    // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
                    comments: false,
                }
            })
        ]
    },

});