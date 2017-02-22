# 0.6.0

* Downgrade tslint, tslint-loader and ts-loader to reduce compatibility issues with previous configurations
* **test** option now generates a _JUNit_ report under `/coverage` folder
* Coverage Report is now under `/coverage/lcov-report/`
* Coverage report correctly uses source maps

# 0.5.0

* Upgrading dependencies.

## Breaking Changes

* `jasmine` and `node` type definitions are no longer required in `typings.json`. Including them may cause compilation errors.
* Linter rules: `label-undefined`, `no-constructor-vars`, `no-duplicate-key`, `no-unreachable`, `no-unused-variable`, `use-strict` are no longer supported.
* You need to upgrade `tslint`, `typescript`, `typings` to recent versions.
* Libraries `es6-shim`, `zone.js`, `reflect-metadata` are included an no longer need to be included in your `package.json`.
* New version of the linter may cause some code to fail. You maiy need to update your rules or your code after the upgrade.

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

