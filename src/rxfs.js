const fs = require('fs');
const rx = require('rxjs');

module.exports = {
    readFile: rx.Observable.bindNodeCallback(fs.readFile),
    writeFile: rx.Observable.bindNodeCallback(fs.writeFile)
};