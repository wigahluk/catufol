'use strict';

const cli = require('./cli/cli');

function singleRun (conf, callback) {
    const Server = require('karma').Server;
    const server = new Server(conf.karmaTest(), function(exitCode) {
        cli.log('Karma has exited with ' + exitCode);
        callback(exitCode)
    });
    server.start();
}


function interactiveRun (conf, callback) {
    const Server = require('karma').Server;
    const server = new Server(conf.karmaDebug(), function(exitCode) {
        cli.log('Karma has exited with ' + exitCode);
        callback(exitCode)
    });
    server.start();
}

module.exports = {
    singleRun: singleRun,
    interactiveRun: interactiveRun
};
