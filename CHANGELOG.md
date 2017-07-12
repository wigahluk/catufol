# 0.7.2

## Bugs Fixed

* Headless flags (-hl --headless) are now consistently being picked up by the argumenter and launches tests using headless chrome browser in an incognito setup.

# 0.7.1

## Bugs Fixed

* Local hidden folders and files were exposed in Webpack dev server and hence across all other layers. Now all local paths starting with "." return `404`.

# 0.7.0

## Breaking changes

* Now users have to pass `-hl` or `--headless` flag to run tests using Headless Chrome browser

## Bugs Fixed

* Fixing ability to run tests locally

## Dependency changes 

**css-loader:** Upgraded from 0.26.1 to 0.28.4
**es6-shim:** Upgraded from 0.35.2 to 0.35.3
**file-loader:** Upgraded from 0.9.0 to 0.11.1
**html-loader:** Upgraded from 0.4.4 to 0.4.5
**html-webpack-plugin:** Upgraded from 2.26.0 to 2.28.0
**karma:** Upgraded from 1.4.1 to 1.7.0
**karma-chrome-launcher:** Upgraded from 2.0.0 to 2.1.1
**karma-webpack:** Upgraded from 2.0.2 to 2.0.3
**reflect-metadata:** Upgraded from 0.1.9 to 0.1.10
**style-loader:** Upgraded from 0.13.1 to 0.18.1
**ts-loader:** Upgraded from 0.8.2 to 2.1.0
**tslint-loader:** Upgraded from 2.1.5 to 3.5.3
**url-loader:** Upgraded from 0.5.7 to 0.5.8
**webpack:** Upgraded from 1.13.2 to 1.13.3
**zone.js:** Upgraded from 0.6.26 to 0.7.2

# 0.6.3

* Adding capabilities to run using Headless Chrome 

# 0.6.2

* Optional loader configuration added for **Sass**.

## Breaking Changes

* RxJS is no longer a development dependency. No it is a Peer Dependency and you will need to install it on your project.


# 0.6.1

* Fix port configuration for Webpack dev server (thanks to Amr)

# 0.6.0

* Downgrade tslint, tslint-loader and ts-loader to reduce compatibility issues with previous configurations
* **test** option now generates a _JUnit_ report under `/coverage` folder
* Coverage Report is now under `/coverage/lcov-report/`
* Coverage report correctly uses source maps

# 0.5.0

* Upgrading dependencies.

## Breaking Changes

* `jasmine` and `node` type definitions are no longer required in `typings.json`. Including them may cause compilation errors.
* Linter rules: `label-undefined`, `no-constructor-vars`, `no-duplicate-key`, `no-unreachable`, `no-unused-variable`, `use-strict` are no longer supported.
* You need to upgrade `tslint`, `typescript`, `typings` to recent versions.
* Libraries `es6-shim`, `zone.js`, `reflect-metadata` are included and no longer need to be included in your `package.json`.
* New version of the linter may cause some code to fail. You may need to update your rules or your code after the upgrade.

# 0.4.0

* Removing support for PhantomJS

# 0.3.0

* Removing support for `-c` and `--clean` as they should be used internally.

# 0.2.0

* Updating dependencies and including ZoneJS.

# 0.1.9

* A new file named `buildinfo.json` is now generated at the root of the build folder.
* Requires __RxJs__ as a dependency.
* Updates on dependency versions for `phantomjs-prebuilt`, `istanbul-instrumenter-loader` and `webpack-dev-server`.  

# 0.1.8

* You can include files for the Karma loader using `karmaFiles` in the configuration file.
* Bundled files include now a hash in their name.

