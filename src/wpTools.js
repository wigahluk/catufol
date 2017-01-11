'use strict';

const path = require('path');
const pwd = process.cwd();
const nModules = path.resolve(pwd, './node_modules');
const appPath = path.resolve(pwd, './app');

const devTool = {
    sourceMap: 'source-map',
    inlineMap: 'inline-source-map'
};

const resolveExtensions = ['.ts','.js','.json','.css', '.less', '.html'];

const loaders = {
    tsWithComments: {
        loader: 'ts-loader',
        options: {
            'compilerOptions': {
                'removeComments': false
            }
        },
    },
    tsNoComments: {
        loader: 'ts-loader',
        options: {
            'compilerOptions': {
                'removeComments': true
            }
        }
    },
    html: {
        loader: 'html-loader',
        options: {
            minimize: true,
            removeAttributeQuotes: false,
            caseSensitive: true,
            customAttrSurround: [ [/#/, /(?:)/], [/\*/, /(?:)/], [/\[?\(?/, /(?:)/] ],
            customAttrAssign: [ /\)?\]?=/ ]
        }
    }
};

const rules = {
    tsLint: {
        test: /\.ts$/,
        enforce: 'pre',
        exclude: [nModules],
        use: [ 'tslint-loader' ]
    },
    ts: {
        test: /\.ts$/,
        exclude: [nModules],
        use: [ 'ts-loader' ]
    },
    tsTest: {
        test: /\.ts$/,
        exclude: [nModules],
        use: [ loaders.tsWithComments ]
    },
    tsDebug: {
        test: /\.ts$/,
        exclude: [nModules],
        use: [ loaders.tsNoComments ]
    },
    istanbul: {
        test: /\.(?:js|ts)$/,
        use: [ 'istanbul-instrumenter-loader' ],
        enforce: 'post',
        include: appPath,
        exclude: [
            /\.spec\.ts$/,
            /app\/domain\/services\/testing/,
            /node_modules/
        ]
    },
    html: {
        test: /\.html$/,
        use: [ loaders.html]
    },
    raw: {
        test: /\.(?:tjs|tjson|xml)$/,
        use: ['raw-loader']
    },
    styleNullLoader: {
        test: /\.(?:css|less|scss|styl)$/,
        use: [ 'null-loader' ]
    },

    jpg: {
        test: /\.(?:jpg|png)$/,
        use: ['url-loader?limit=100000']
    },
    less:{
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
    },
    css: {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
    },
    woff: {
        test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/,
        use: ['url-loader?limit=100000&mimetype=application/font-woff']
    },
    ttf: {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: ['url-loader?limit=100000&mimetype=application/octet-stream']
    },
    eot: {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: ['file-loader']
    },
    svg: {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: ['url-loader?limit=100000&mimetype=image/svg+xml']
    }
};

module.exports = {
    devtool: devTool,
    extensions: resolveExtensions,
    rules: rules
};
