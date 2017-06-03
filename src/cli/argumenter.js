const cli = require('./cli');
const rx = require('rxjs');
const fs = require('../fs/rxfs');

function Action (name, confPath) {
    this.name = name;
    this.confPath = confPath;
}

const read = args => rx.Observable.of(args)
    .map(as => {
        let confPath = './catufol.json';
        if (as && as.length > 0 && cli.has(as, '--conf')) {
            confPath = cli.get(as, '--conf');
            if (!confPath) { throw new Error('Seems that the conf path is missing. ' +
                'If "conf" parameter is used it needs to be followed by the path to the configuration file.')}
        }
        if (as && as.length > 0 && (cli.has(as, '-c') || cli.has(as, '--clean'))) {
            return new Action('clean', confPath);
        }
        if (as && as.length > 0 && (cli.has(as, '-b') || cli.has(as, '--build'))) {
            return new Action('build', confPath);
        }
        if (as && as.length > 0 && (cli.has(as, '-r') || cli.has(as, '--run'))) {
            return new Action('run', confPath);
        }
        if (as && as.length > 0 && (cli.has(as, '-t') || cli.has(as, '--test'))) {
            return new Action('test', confPath);
        }
        if (as && as.length > 0 && (cli.has(as, '-hl') || cli.has(as, '--headless'))) {
            return new Action('headless', confPath);
        }
        if (as && as.length > 0 && (cli.has(as, '-i') || cli.has(as, '--interactive'))) {
            return new Action('interactive', confPath);
        }
        return new Action('help', confPath);
    })
    .flatMap(args => fs.readFile('package.json', 'utf8').map(j => {
        const pack = JSON.parse(j);
        args.packageName = pack.name;
        args.packageMain = pack.main || './app/main.ts';
        return args;
    }));

module.exports = {
    read: read
};