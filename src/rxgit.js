const morral = require('morral');
const rx = require('rxjs');

module.exports = {
    sha: rx.Observable.bindNodeCallback(morral.git.sha)
};