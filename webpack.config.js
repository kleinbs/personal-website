const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: './src/js/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js'
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [{ loader: "html-loader", options: { minimize: false } }]
            }, {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader",
                    "postcss-loader"
                ]
            }, {
                test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                exclude: /images/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: '.'
                    }
                }]
            }
        ],
    },
    resolve: {
        alias: {
            node_module: path.resolve(__dirname, 'src')
        }
    },
    plugins: [
        new HtmlWebPackPlugin({
            filename: 'index.html',
            template: 'src/html/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new CopyWebpackPlugin([
            {
                from: 'src/assets/**',
                to: './',
                flatten: true
            },
        ])
    ]
};