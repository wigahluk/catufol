/* global describe */
/* global it */
/* global expect */

const argumenter = require('./argumenter');

describe('Argumenter', () => {
    it('Emits help if argument array is empty', (done) => {
        const args = [];
        argumenter.read(args).subscribe(
            action => { expect(action.name).toBe('help'); },
            undefined,
            () => { done(); }
        );
    });
    it('Emits help if arguments contain -h', (done) => {
        const args = ['-h'];
        argumenter.read(args).subscribe(
            action => {
                expect(action.name).toBe('help');
            },
            undefined,
            () => { done(); }
        );
    });
    it('Emits help if arguments contain --help', (done) => {
        const args = ['--help'];
        argumenter.read(args).subscribe(
            action => { expect(action.name).toBe('help'); },
            undefined,
            () => { done(); }
        );
    });
    it('Emits build if arguments contain -b', (done) => {
        const args = ['-b'];
        argumenter.read(args).subscribe(
            action => { expect(action.name).toBe('build'); },
            undefined,
            () => { done(); }
        );
    });
    it('Emits build if arguments contain --build', (done) => {
        const args = ['--build'];
        argumenter.read(args).subscribe(
            action => { expect(action.name).toBe('build'); },
            undefined,
            () => { done(); }
        );
    });
    it('Emits run if arguments contain -r', (done) => {
        const args = ['-r'];
        argumenter.read(args).subscribe(
            action => { expect(action.name).toBe('run'); },
            undefined,
            () => { done(); }
        );
    });
    it('Emits run if arguments contain --run', (done) => {
        const args = ['--run'];
        argumenter.read(args).subscribe(
            action => { expect(action.name).toBe('run'); },
            undefined,
            () => { done(); }
        );
    });
    it('Emits test if arguments contain -t', (done) => {
        const args = ['-t'];
        argumenter.read(args).subscribe(
            action => { expect(action.name).toBe('test'); },
            undefined,
            () => { done(); }
        );
    });
    it('Emits test if arguments contain --test', (done) => {
        const args = ['--test'];
        argumenter.read(args).subscribe(
            action => { expect(action.name).toBe('test'); },
            undefined,
            () => { done(); }
        );
    });
    it('Emits interactive if arguments contain -i', (done) => {
        const args = ['-i'];
        argumenter.read(args).subscribe(
            action => { expect(action.name).toBe('interactive'); },
            undefined,
            () => { done(); }
        );
    });
    it('Emits interactive if arguments contain --interactive', (done) => {
        const args = ['--interactive'];
        argumenter.read(args).subscribe(
            action => { expect(action.name).toBe('interactive'); },
            undefined,
            () => { done(); }
        );
    });
    it('Event has config predefined', (done) => {
        const args = ['--run'];
        argumenter.read(args).subscribe(
            action => {
                expect(action.name).toBe('run');
                expect(action.confPath).toBe('./catufol.json');
            },
            undefined,
            () => { done(); }
        );
    });
    it('Event has config can be overridden', (done) => {
        const args = ['--run', '--conf', './hello.json'];
        argumenter.read(args).subscribe(
            action => {
                expect(action.name).toBe('run');
                expect(action.confPath).toBe('./hello.json');
            },
            undefined,
            () => { done(); }
        );
    });
    it('Emit error if no conf is providen', (done) => {
        const args = ['--run', '--conf'];
        argumenter.read(args).subscribe(
            action => {
                expect('should not be called').toBeUndefined();
            },
            error => { expect('should be called').toBeDefined(); done(); },
            () => { done(); }
        );
    });
    it('Emit should have the project name and main', (done) => {
        const args = ['--run', '--conf', './hello.json'];
        argumenter.read(args).subscribe(
            action => {
                expect(action.packageName).toBe('catufol');
                expect(action.packageMain).toBe('./src/catufol.js');
            },
            undefined,
            () => { done(); }
        );
    });
});
