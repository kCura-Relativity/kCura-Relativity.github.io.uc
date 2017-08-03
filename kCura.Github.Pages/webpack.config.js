"use strict";

const path = require("path");
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AotPlugin = require('@ngtools/webpack').AotPlugin;

const ENV = process.env.NODE_ENV;
const isProduction = (ENV === 'production');

const config = {
    entry: {
        app: './src/main.ts',
        polyfills: './src/polyfills.ts',
        vendor: isProduction ? './src/vendor.aot.ts' : './src/vendor.ts'
    },

    devtool: 'inline-source-map',

    output: {
        path: path.resolve(__dirname, "build"),
        filename: "js/[name].js"
    },

    resolve: {
        alias: {
            App: path.resolve(__dirname, "src/app")
        },
        extensions: ['.js', '.ts', '.scss', '.html']
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: isProduction ?
                    ['@ngtools/webpack'] :
                    [{
                        loader: 'awesome-typescript-loader', 
                        options: {
                            "usewebpacktext": true
                        }
                    }, 
                    'angular2-template-loader']
            },
            {
                test: /\.html$/,
                include: [path.resolve(__dirname, "src/app")],
                use: {
                    loader: 'html-loader',
                    options: {
                        minimize: isProduction,
                        removeAttributeQuotes: false,
                        caseSensitive: true,
                        customAttrSurround: [[/#/, /(?:)/], [/\*/, /(?:)/], [/\[?\(?/, /(?:)/]],
                        customAttrAssign: [/\)?\]?=/]
                    },
                }
            },
            {
                test: /\.(jpg|png|gif|svg)$/,
                include: [path.resolve(__dirname, "src/content/img")],
                use: 'file-loader?name=./img/[name].[ext]'
            },
            {
                test: /\.(svg|eot|ttf|woff|woff2)$/,
                include: [path.resolve(__dirname, "src/content/fonts")],
                use: 'file-loader?name=./fonts/[name].[ext]'
            },
            {
                test: /\.scss$/,
                use: ['css-to-string-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: isProduction
                            }
                        },
                        'sass-loader']
            }
        ]
    },

    plugins: [

        new webpack.ContextReplacementPlugin(
          /angular(\\|\/)core(\\|\/)@angular/,
          './src'
        ),

        new CleanWebpackPlugin(['build'], {
            verbose: true
        }),

        new CopyWebpackPlugin([
            { from: './src/content/languages', to: './languages' }
        ]),

        new CopyWebpackPlugin([
            { from: './src/content/data', to: './data' }
        ]),

        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        }),

        new webpack.DefinePlugin({
            // The process.env.NODE_ENV variable is needed to build redux properly for production mode.
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            'IS_PRODUCTION': process.env.NODE_ENV === 'production'
        }),

        new HtmlWebpackPlugin({
            template: './src/index.html',
            minimize: false,
            baseUrl: isProduction ? '/' : '/build/'
        })
    ]
};

// Add additional functionality for production builds.
if (isProduction) {
    
    config.plugins.push(
        new AotPlugin({
            tsConfigPath: path.resolve(__dirname, "tsconfig.json"),
            entryModule: path.resolve(__dirname, "src/app/app.module#AppModule")
        }));
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: true,
            compress: true,
            comments: false
        }));
}

module.exports = config;