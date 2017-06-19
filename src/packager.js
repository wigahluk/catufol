'use strict';
/**
 * Creates a webpack development server
 */
const cli = require('./cli/cli');
const git = require('./rxgit');
const fs = require('./fs/rxfs');
const path = require('path');
const pwd = process.cwd();

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');


const getCompiler = conf => {
    const compiler = webpack(conf);
    compiler.plugin('compile', () => { cli.log('Webpack bundling started.'); });
    compiler.plugin('done', () => { cli.log('Webpack bundling completed.'); });
    return compiler;
};

const getServer = conf =>
    new WebpackDevServer(getCompiler(conf), {
        publicPath: '/', // Always run on root
        hot: true,       // Configure hot replacement
        quiet: false,    // Reduce the noise on the terminal
        noInfo: false,   // Reduce the noise on the terminal
        stats: {
            chunks: false,
            colors: true
        },
        setup: app => {
            // Adding an extra handler on the Webpack server middleware to prevent local hidden folders to be exposed.
            app.get(/^\/\..+/, (req, res) => { res.status(404).end(); });
        }
    });


function run (conf) {
    getServer(conf.wpRun())
        .listen(conf.wpPort(), () => { cli.log(`Webpack Development Server running at port ${conf.wpPort()}`); })
}

function build (conf) {
    getCompiler(conf.wpBuild()).run((err, stats) => {
        if (err) {
            cli.log('Error while building.\n');
            cli.log(err);
            process.exit(1);
        }
        const jConf = conf.json();
        const infoPath = path.resolve(pwd, conf.buildPath());
        const today = new Date();
        git.sha()
            .map(sha => ({
                appName: jConf.appName,
                buildTimeStamp: today.valueOf(),
                buildDate: today.toISOString(),
                webpackHash: stats.hash,
                gitSha: sha
            }))
            .flatMap(info => fs.writeFile(infoPath + '/buildinfo.json', JSON.stringify(info), 'utf8'))
            .subscribe(
                undefined,
                error => {
                    cli.log('Unable to write buildInfo.json file due to Error ', error);
                    process.exit(1);
                },
                () => { cli.log('Build completed.'); }
            );
    })
}

module.exports = {
    run: run,
    build: build
};