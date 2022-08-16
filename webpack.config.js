const webpack = require('webpack');

const webpackConfig = {
    entry: './source/scripts/main.js',
    output: {
        path: __dirname,
        filename: 'main.js',
        publicPath: 'dist/scripts/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /(node_modules|bower_components)/,
                options: {
                  presets: ['@babel/preset-env'],
                },
            }
        ]
    },
    resolve: {
        modules: ['./node_modules']
    },
    mode: 'development',
    devtool: 'source-map'
};

module.exports = webpackConfig;
