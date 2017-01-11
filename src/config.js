'use strict';
const path = require('path');
const pwd = process.cwd();

const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const wp = require('./wpTools');
const karma = require('./karmaTools');

function Configuration (json) {
    this.json = function () {
        return {
            appName: json.appName,
            buildPath: this.buildPath(),
            vendors: json.vendors.slice(),
            devEntryFile: json.devEntryFile || './app/main.ts',
            prodEntryFile: json.prodEntryFile || './app/main.ts',
            exportJQuery: !!json.exportJQuery,
            karmaFiles: json.karmaFiles || []
        };
    };
    this.buildPath = function () { return json.buildPath || './build'; };
    this.wpPort = function () { return json.devServerPort || 8080; }
}

Configuration.prototype.wpBase = function () {
    const plugins = [];
    if (this.json().exportJQuery) {
        plugins.push(new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }));
    }
    return {
        plugins: plugins,
        resolve: { extensions: wp.extensions },
        module: {
            rules: []
        }
    };
};

Configuration.prototype.wpRunBase = function () {
    const conf = this.json();
    const base = this.wpBase();
    base.entry = {
        app: [],
        vendor: conf.vendors
    };
    base.output = {
        path: path.resolve(pwd, conf.buildPath),
        filename: `${conf.appName}/bundles/bundle.[hash].js`,
        sourceMapFilename: '[file].map',
        publicPath: '/'
    };
    base.module.rules.push(wp.rules.tsLint);
    base.module.rules.push(wp.rules.ts);
    base.module.rules.push(wp.rules.html);
    base.module.rules.push(wp.rules.raw);
    base.module.rules.push(wp.rules.jpg);
    base.module.rules.push(wp.rules.less);
    base.module.rules.push(wp.rules.css);
    base.module.rules.push(wp.rules.woff);
    base.module.rules.push(wp.rules.ttf);
    base.module.rules.push(wp.rules.eot);
    base.module.rules.push(wp.rules.svg);
    return base;
};

Configuration.prototype.wpBuild = function () {
    const conf = this.json();
    const base = this.wpRunBase();
    base.devtool = wp.devtool.sourceMap;
    base.entry.app.push(conf.prodEntryFile);
    base.plugins.push(new HtmlWebpackPlugin({filename: 'index.html', template: './app/index.html'}));
    base.plugins.push(new webpack.LoaderOptionsPlugin({ minimize: true }));
    base.plugins.push(new webpack.optimize.UglifyJsPlugin({
        sourceMap: true
    }));
    base.plugins.push(new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: `${conf.appName}/bundles/vendor.bundle.[hash].js`}));
    return base;
};

Configuration.prototype.wpRun = function () {
    const conf = this.json();
    const base = this.wpRunBase();
    base.performance = { hints: false };
    base.devtool = wp.devtool.inlineMap;
    base.entry.app.push('webpack/hot/dev-server');
    base.entry.app.push('webpack-dev-server/client?http://localhost:8080');
    base.entry.app.push(conf.devEntryFile);
    base.plugins.push(new webpack.HotModuleReplacementPlugin());
    base.plugins.push(new HtmlWebpackPlugin({filename: 'index.html', template: './app/index.html'}));
    base.plugins.push(new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: `${conf.appName}/bundles/vendor.bundle.js`}));
    return base;
};

Configuration.prototype.wpTestBase = function () {
    const base = this.wpBase();
    base.performance = { hints: false };
    base.devtool = wp.devtool.inlineMap;
    base.module.rules.push(wp.rules.html);
    base.module.rules.push(wp.rules.raw);
    base.module.rules.push(wp.rules.styleNullLoader);
    return base;
};

Configuration.prototype.wpTest = function () {
    const base = this.wpTestBase();
    base.module.rules.push(wp.rules.tsLint);
    base.module.rules.push(wp.rules.tsTest);
    base.module.rules.push(wp.rules.istanbul);
    return base;
};

Configuration.prototype.wpDebug = function () {
    const base = this.wpTestBase();
    base.devtool = wp.devtool.inlineMap;
    base.module.rules.push(wp.rules.tsDebug);
    return base;
};

Configuration.prototype.karmaBase = function () {
    const json = this.json();
    const files = [
        karma.es6Shim,
        'node_modules/zone.js/dist/zone.min.js',
        'node_modules/zone.js/dist/long-stack-trace-zone.js',
        'node_modules/zone.js/dist/proxy.js',
        'node_modules/zone.js/dist/sync-test.js',
        'node_modules/zone.js/dist/jasmine-patch.js',
        'node_modules/zone.js/dist/async-test.js',
        'node_modules/zone.js/dist/fake-async-test.js',
        'node_modules/reflect-metadata/Reflect.js',
        { pattern: 'test.loader.js', watched: false }
    ].concat(json.karmaFiles);
    return {
        basePath: '',
        logLevel: 'info',
        port: 9876,
        frameworks: ['jasmine'],
        files: files,
        preprocessors: { 'test.loader.js': ['webpack', 'sourcemap'] }
    };
};

Configuration.prototype.karmaTest = function () {
    const base = this.karmaBase();
    base.browsers = ['Chrome'];
    base.singleRun = true;
    base.reporters = ['dots', 'coverage'];
    base.coverageReporter = {
        dir : 'coverage/',
        reporters: [
            { type: 'text-summary' },
            { type: 'json' },
            { type: 'html' }
        ]
    };
    base.webpack = this.wpTest();
    base.webpackMiddleware = { noInfo: true };
    return base;
};

Configuration.prototype.karmaDebug = function () {
    const base = this.karmaBase();
    base.browsers = ['Chrome'];
    base.singleRun = false;
    base.reporters = ['progress'];

    base.webpack = this.wpDebug();
    base.webpackMiddleware = { noInfo: true };
    return base;
};

module.exports = Configuration;
