Belatrix Connect Web Application
=============

This web application has been designed using:

- [AngularJS] (https://angularjs.org/)
- [Angular Material] (https://material.angularjs.org/)
- [Gulp] (http://gulpjs.com/)
- [Bower] (http://bower.io/)
- [NodeJS] (https://nodejs.org/)

#Features

- Using john papa gulp patterns and style guide [more details] (https://github.com/johnpapa/gulp-patterns).
- Material Design Specifications

-----------------------------------

#First you need to install following

**Installing Node.js**


**Windows**
> You can download the .exe installer [here] (https://nodejs.org/en/download/) and follow the wizard to installation


**Linux - Ubuntu/Debian**

1- Open your terminal and execute the next commands
```bash
sudo apt-get update && sudo apt-get install git-core curl build-essential openssl libssl-dev
```
2- Then cloning the nodeJS repository in a desired location
```bash
git clone https://github.com/nodejs/node.git node && cd node
```
3- If you wish choose a version, but if you want to work with the latest skip this step
```bash
git checkout v4.4.3
```
4- Creating the makefile
```bash
./configure
```
5- Preparing the installation
```bash
make
```
6- Installing
```bash
sudo make install
```

**Installing Bower**
```bash
npm install -g bower
```
for more details visit [Bower website] (http://bower.io/)

**Installing GULP**
```bash
npm install -g bower gulp
```
for more details visit [Bower website] http://gulpjs.com/)


**Install node packages dependencies**

`npm install`

**Install bower dependencies**

`bower install --config.interactive=false`

-----------------------------------

## Gulp Tasks

### Task Listing

- `gulp help`

    Displays all of the available gulp tasks.

### Code Analysis

- `gulp vet`

    Performs static code analysis on all javascript files. Runs jshint and jscs.

- `gulp vet --verbose`

    Displays all files affected and extended information about the code analysis.

### Testing

- `gulp serve-specs`

    Serves and browses to the spec runner html page and runs the unit tests in it. Injects any changes on the fly and re runs the tests. Quick and easy view of tests as an alternative to terminal via `gulp test`.

- `gulp test`

    Runs all unit tests using karma runner, mocha, chai and sinon with phantomjs. Depends on vet task, for code analysis.

- `gulp test --startServers`

    Runs all unit tests and midway tests. Cranks up a second node process to run a server for the midway tests to hit a web api.

- `gulp autotest`

    Runs a watch to run all unit tests.

- `gulp autotest --startServers`

    Runs a watch to run all unit tests and midway tests. Cranks up a second node process to run a server for the midway tests to hit a web api.

### Cleaning Up

- `gulp clean`

    Remove all files from the build and temp folders

- `gulp clean-images`

    Remove all images from the build folder

- `gulp clean-code`

    Remove all javascript and html from the build folder

- `gulp clean-styles`

    Remove all styles from the build folder

### Fonts and Images

- `gulp images`

    Copy all images from source to the build folder

### Styles

- `gulp styles`

    Compile less files to CSS, add vendor prefixes, and copy to the build folder

### Bower Files

- `gulp wiredep`

    Looks up all bower components' main files and JavaScript source code, then adds them to the `index.html`.

    The `.bowerrc` file also runs this as a postinstall task whenever `bower install` is run.

### Angular HTML Templates

- `gulp templatecache`

    Create an Angular module that adds all HTML templates to Angular's $templateCache. This pre-fetches all HTML templates saving XHR calls for the HTML.

- `gulp templatecache --verbose`

    Displays all files affected by the task.

### Serving Development Code

- `gulp serve-dev`


### Building Production Code

- `gulp optimize`

    Optimize all javascript and styles, move to a build folder, and inject them into the new index.html

- `gulp build`

    Copies all fonts, copies images and runs `gulp optimize` to build the production code to the build folder.

### Serving Production Code

- `gulp serve-build`

    Serve the optimized code from the build folder and launch it in a browser.

- `gulp serve-build --nosync`

    Serve the optimized code from the build folder and manually launch the browser.

- `gulp serve-build --debug`

    Launch debugger with node-inspector.

- `gulp serve-build --debug-brk`

    Launch debugger and break on 1st line with node-inspector.


-----------------------------------

Thanks, help to improve this document.

Belatrix Web Connect Team
