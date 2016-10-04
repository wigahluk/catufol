'use strict';
/**
 * Creates a webpack development server
 */
const cli = require('./cli');

var webpack = require('webpack');
var webpackDevServer = require('webpack-dev-server');

function getServer (conf) {
    const compiler = getCompiler(conf);
    return new webpackDevServer(compiler, {
        publicPath: '/', // Always run on root
        hot: true, // Configure hot replacement
        quiet: false,
        noInfo: false,
        stats: {
            chunks: false,
            colors: true
        }
    });
}

function getCompiler(conf) {
    const compiler = webpack(conf);
    compiler.plugin('compile', function() {
        cli.log('Webpack bundling started.');
    });
    compiler.plugin('done', function() {
        cli.log('Webpack bundling completed.');
    });
    return compiler;
}

function run (conf) {
    const server = getServer(conf.wpRun());
    server.listen(conf.wpPort(), function () {
        cli.log('Webpack Development Server running at port ' + conf.wpPort());
    })
}

function build (conf) {
    const comp = getCompiler(conf.wpBuild());
    comp.run(function (err, stats) {
        if (err) {
            cli.log('Error while building.\n');
            cli.log(err);
            process.exit(1);
        }
        cli.log('Build completed.');
        cli.log('Hash: ' + stats.hash);
    })
}

module.exports = {
    run: run,
    build: build
};