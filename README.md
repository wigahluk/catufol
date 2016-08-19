Catufol
=======


## Conventions

### Folders

* `app` contains all the source files, including tests
* `build` will be used for generated files and its content will be deleted on every build. It should not be versioned
* `coverage` will contain the test coverage reports and it should also be ignored on from version control

## Dependencies

* __Webpack__ This project is sort of a Webpack wrapper, without it, it doesn't make too much sense
* __TypeScript__ This project is very opinionated on languages and it assumes you'll use TypeScript, although it will
be compatible with JavaScript sources too
* __Karma__ It is assumed that your project is using Karma to run tests. No plans to support any other tool
* __Jasmine__ For now we assume your project is ussing Jasmine for unit tests, probably we'll add support for
mocha in the future.
* __NodeJS 5.0__ or greater
