Belatrix Connect Web Application
================================

*About the web application*

This web application has the mission to represent the idea to connect all the co-workers inside Belatrix family, to valuate and recognize the work and the team-spirit, using a gamification´s mechanics to create  and interact through motivation  in a better coexistence.

*About the project architecture*

The main purpose of this architecture is minify, simplify resources and methods to develop web applications, in order to create an alternative agile and a simple way to build a project. In this case the philosophy about this repository is avoid sofistication and the preconception of other techniques that using reinvented ideas, so this is important to reach a new challenge of do a simple and functional web application oriented and based totally in user experience.

This web application has been designed using the nex tools:

- [Material Design Specifications] (https://material.google.com/)
- [AngularJS] (https://angularjs.org/)
- [Angular Material] (https://material.angularjs.org/)
- [Gulp] (http://gulpjs.com/)
- [Bower] (http://bower.io/)
- [NodeJS] (https://nodejs.org/)

#Features

- Simple architecture based in the pure purpose of the mentioned tools to use
- Material Design Specifications

**1. First you need to install following**

(if you have previous knowledge about nodeJS skip to 2nd step)

**Installing Node.js**


*Windows*
> You can download the .exe installer [here] (https://nodejs.org/en/download/) and follow the wizard to installation


*Linux - Ubuntu/Debian*

1.1. Open your terminal and execute the next commands
```bash
sudo apt-get update && sudo apt-get install git-core curl build-essential openssl libssl-dev
```
1.2. Then cloning the nodeJS repository in a desired location
```bash
git clone https://github.com/nodejs/node.git node && cd node
```
1.3. If you wish choose a version, but if you want to work with the latest skip this step
```bash
git checkout v4.4.3
```
1.4- Creating the makefile
```bash
./configure
```
1.5. Preparing the installation
```bash
make
```
1.6. Installing
```bash
sudo make install
```

**2. Use a simple command to install all**

`npm install`

- This do the nodeJS dependencies installation, bower and bower-installer to simplify the specifics files in a clean folder, prevoiusly configured in package.json like this:

```bash
package.json chunk to configure
{
  "name": "belatrix-web-connect",
  "version": "0.0.1",
  "description": "web application to connect collaborators in a great company",
  "main": "index.js",
  "scripts": {
    "start": "gulp server",
    "postinstall": "bower install && bower-installer",
    "test": "echo \"Error: no test specified\" && exit 1"
  },...
```
- It´s easy, the "install" part contains the neccesary commands to install the dependencies

**3. Run the app**

`npm start`

- This runs gulp server to build the app and run the server

**GULP TASKS**

```bash
  gulp server
```
Open a server in port http://localhost:3000 with livereload


Thanks, help to improve this document.

Belatrix Web Connect Team
