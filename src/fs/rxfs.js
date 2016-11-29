const fs = require('fs');
const rx = require('rxjs');

const readFile = rx.Observable.bindNodeCallback(fs.readFile);
const writeFile = rx.Observable.bindNodeCallback(fs.writeFile);
const exists = path => rx.Observable.bindNodeCallback(fs.lstat)(path)
    .map(s => true ).catch(e => rx.Observable.of(false));

module.exports = {
    readFile: readFile,
    writeFile: writeFile,
    exists: exists
};