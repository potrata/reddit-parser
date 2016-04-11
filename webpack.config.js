var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'source-map',
    entry: [
        './src/public/js/index.js'
    ],
    output: {
        path: './dist/public',
        filename: 'build/bundle.js'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
            }
        })
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel'],
                include: path.join(__dirname, './src/public/js')
            },
            {
                test: /\.json$/,
                loader: 'json'
            },
        ]
    }
};