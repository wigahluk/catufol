'use strict';

const path = require('path');
const pwd = process.cwd();
const nModules = path.resolve(pwd, './node_modules');
const appPath = path.resolve(pwd, './app');

const devTool = {
    sourceMap: 'source-map',
    inlineMap: 'inline-source-map'
};

const resolveExtensions = ['', '.ts','.js','.json','.css', '.less', '.html'];

const htmlLoader = {
    minimize: true,
    removeAttributeQuotes: false,
    caseSensitive: true,
    customAttrSurround: [ [/#/, /(?:)/], [/\*/, /(?:)/], [/\[?\(?/, /(?:)/] ],
    customAttrAssign: [ /\)?\]?=/ ]
};

const tslint = {
    emitErrors: false,
    failOnHint: false
};

const loaders = {
    ts: {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: [ nModules ]
    },
    tsWithComments: {
        test: /\.ts$/,
        loader: 'ts-loader',
        query: { "compilerOptions": { "removeComments": false } },
        exclude: [ nModules ]
    },
    tsNoComments: {
        test: /\.ts$/,
        loader: 'ts-loader',
        query: { "compilerOptions": { "removeComments": true } },
        exclude: [ nModules ]
    },
    tslint: {
        test: /\.ts$/,
        loader: "tslint"
    },
    html: {
        test: /\.html$/,
        loader: "html-loader"
    },
    json: {
        test: /\.json$/,
        loader: "json-loader"
    },
    jpg: {
        test: /\.(?:jpg|png)$/,
        loader: 'url-loader?limit=100000'
    },
    less:{
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader'
    },
    scss:{
        test: /\.scss/,
        loader: 'style-loader!css-loader!sass-loader'
    },
    css: {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
    },
    woff: {
        test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=100000&mimetype=application/font-woff"
    },
    ttf: {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=100000&mimetype=application/octet-stream"
    },
    eot: {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader"
    },
    svg: {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=100000&mimetype=image/svg+xml"
    },
    raw: {
        test: /\.(?:tjs|tjson|xml)$/,
        loader: 'raw-loader'
    },
    istanbul: {
        test: /\.(?:js|ts)$/,
        include: appPath,
        loader: 'istanbul-instrumenter-loader',
        exclude: [
            /\.spec\.ts$/,
            /app\/domain\/services\/testing/,
            /node_modules/
        ]
    },
    styleNullLoader: {
        test: /\.(?:css|less|scss|styl)$/,
        loader: 'null-loader'
    }
};

module.exports = {
    devtool: devTool,
    extensions: resolveExtensions,
    htmlLoader: htmlLoader,
    tslint: tslint,
    loaders: loaders
};
