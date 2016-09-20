Belatrix Connect Web Application
=============

The main purpose of this architecture is minify and simplify resources and methods to develop, in order to create an agile and simple way to develop a project. In this case the philosophy about this repository is avoid the sofistication and preconception of techniques in relation to create a new chalenge to do simple and functional sofware oriented totally

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
npm install -g gulp
```
for more details visit [Bower website] (http://gulpjs.com/)

**Installing Bower-installer**
```bash
npm install -g bower-installer
```
for more details visit [Bower-installer site] (https://www.npmjs.com/package/bower-installer)
Finally use a simple command to install all

`npm install` 

- This Do the nodeJS dependencies installation, bower and bower-installer to simplify the specifics files in a clean folder, prevoiusly configured in package.json like this:

```package.json chunk to configure
  
  {
  'name": "belatrix-web-connect",
  version": "0.0.1",
  "description": "web application to connect collaborators in a great company",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "install": "bower install && bower-installer"
  },...
  
```
It´s easy, the install part contains the neccesary commands to install dependencies


Thanks, help to improve this document.

Belatrix Web Connect Team
