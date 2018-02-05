const path = require('path');
let webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

let entry = {
    app: [
        path.resolve(__dirname, './assets/js/index.js'),
        path.resolve(__dirname, './assets/scss/app.scss')
    ],
    vendor: [
        'vue',
    ]
};

let loaders = [
    {
        test: /\.html$/,
        loader: 'html-loader'
    },
    {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
            presets: ["es2015"]
        },
    },
    {
        test: /\.json$/,
        loader: 'json-loader'
    },
    {
        test: /\.(css|scss)$/,
        use: [{
            loader: "style-loader" // creates style nodes from JS strings
        }, {
            loader: "css-loader" // translates CSS into CommonJS
        }, {
            loader: "sass-loader" // compiles Sass to CSS
        }]
    },
];

module.exports = {
    entry: entry,
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public/js/')
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.bundle.js'
        }),
        new AssetsPlugin({
            fullPath: false,
            path: path.resolve(__dirname, '../../')
        }),
        new ExtractTextPlugin({
            filename: './public/css/app.css',
            allChunks: true,
        })
    ],
    module: {
        loaders: loaders
    },
    watch: true, // use webpacks watcher
    watchOptions: {
        aggregateTimeout: 300,
        poll: true
    },
    resolve: {
        modules: [path.resolve(__dirname, '../../assets'), 'node_modules'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
};