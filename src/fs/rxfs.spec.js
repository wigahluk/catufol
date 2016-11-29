/* global describe */
/* global it */
/* global expect */
const fs = require('./rxfs');

describe('Reactive FS', () => {
    it('reads Readme and finds Catùfol on it', done => {
        fs.readFile('./README.md', 'utf-8').subscribe(
            data => { expect(data.indexOf('Catùfol') >= 0).toBe(true); },
            error => { expect('undefined').toBeUndefined(); },
            () => { done(); }
        );
    });

    it('Readme exists', done => {
        fs.exists('./README.md').subscribe(
            data => { expect(data).toBe(true); },
            error => { expect('undefined').toBeUndefined(); },
            () => { done(); }
        );
    });

    it('Readme2 doesn\'t exists', done => {
        fs.exists('./README2.md').subscribe(
            data => { expect(data).toBe(false); },
            error => { expect('undefined').toBeUndefined(); },
            () => { done(); }
        );
    });
});