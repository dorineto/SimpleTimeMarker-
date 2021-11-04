const webpack = require("webpack");
const path = require("path");

const SRC_PATH = path.resolve(__dirname, "src");
const PAGES_PATH = path.resolve(__dirname, "pages");

var config = {
    mode: "development"
    ,entry: {
        index: SRC_PATH + "/index.jsx"
    }
    ,output: {
        path: PAGES_PATH
        ,filename: "assets/js/[name].js"
    }
    ,module: {
        rules: [
            {
                test: /\.m?jsx?/
                ,exclude: /[\\/]node_modules[\\/]/
                ,include: SRC_PATH
                ,use: {
                    loader: "babel-loader"
                    ,options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"]
                    }
                } 
            }
        ]
    }
    ,optimization: {
        moduleIds: 'deterministic'
        ,runtimeChunk: 'single'
        ,splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/
                    ,name: 'vendor'
                    ,chunks: 'all'
                }
            }
        }
    }
};

module.exports = config;