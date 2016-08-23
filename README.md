Catufol
=======

A helper tool on the top of Webpack, Karma, TypeScript and other tools that helps to reduce configuration
steps. The tool will try to work with a minimum of configuration and will use conventions and other project files
to extract configuration settings.

## Conventions

### Folders

* `app` contains all the source files, including tests
* `build` will be used for generated files and its content will be deleted on every build. It should not be versioned
* `coverage` will contain the test coverage reports and it should also be ignored from version control

### Files

* `app/main.ts` entry point for the application
* `app/index.html` template to be used to generate the index.html file for loading the app
* `test.loader.js` entry point for Karma 

## Dependencies

* __Webpack__ This project is sort of a Webpack wrapper, without it, it doesn't make too much sense
* __TypeScript__ This project is very opinionated on languages and it assumes you'll use TypeScript, although it will
be compatible with JavaScript sources too
* __Karma__ It is assumed that your project is using Karma to run tests. No plans to support other tools
* __Jasmine__ For now we assume your project is using Jasmine for unit tests
* __NodeJS 5.0__ or greater


## Usage

Install it with NPM:

    npm install catufol
    
You may want to add a configuration file `catufol.json`:

    {
      "appName": "apps", // It will default to your project name in package.json if not provided
      "vendors": [
        "reflect-metadata",
        "es6-shim",
        ...
      ],
      "devEntryFile": "./app/main.ts", // It will default to ./app/main.ts if not provided
      "prodEntryFile": "./app/main-build.ts" // It will default to ./app/main.ts if not provided
    }

It may be helpful to add some scripts to your `package.json` file:

    "scripts": {
      "build": "catufol -b",
      "start": "catufol -r",
      "test:debug": "catufol -i",
      "test": "catufol -t",
      ...
      },

Test loader file for __Karma__ is expected to be on the root of your project and to be named `test.loader.js` and if
you are using AngularJS 2.0 it may look like this:

    Error.stackTraceLimit = 20;
    
    var context = require.context('./app', true, /\.spec\.ts$/);
    context.keys().forEach(context);
    var testing = require('@angular/core/testing');
    var browserDynamic = require('@angular/platform-browser-dynamic/testing');
    
    testing.setBaseTestProviders(
        browserDynamic.TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS,
        browserDynamic.TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS
    );

### CLI options

* `-t` `--test` will reun unit tests once using PhantomJS. Commonly used in CI environments
* `-i` `--interactive` will run tests in interactive mode using Chrome
* `-r` `--run` will run Webpack Development Server
* `-b` `--build` will create the final artifacts using Webpack