/* global describe */
/* global it */
/* global expect */
/* global require */
'use strict';
const cli = require('./cli');

describe('CLI', () => {
    it('Has matches exact words', () => {
        const source = ['Bye', 'Hello', 'World'];

        expect(cli.has(source, 'hello')).toBe(true);
        expect(cli.has(source, 'HELLO')).toBe(true);
        expect(cli.has(source, 'Hello')).toBe(true);
        expect(cli.has(source, 'Cruel')).toBe(false);
    });

    it('Get value works with several syntax', () => {
        const source = ['Bye', 'Hello', 's1', 'v1', 's2=v2', 's3=', 'v3', 's4:v4', 's5:', 'v5', 'World'];

        expect(cli.get(source, 's1')).toBe('v1');
        expect(cli.get(source, 's2')).toBe('v2');
        expect(cli.get(source, 's3')).toBe('v3');
        expect(cli.get(source, 's4')).toBe('v4');
        expect(cli.get(source, 's5')).toBe('v5');
    });

});