Belatrix Connect Web Application
=============

# Use local environment

Install NodeJS

Install bower and gulp

`npm install -g bower gulp`

Install node packages dependencies

`npm install`

Install bower dependencies

`bower install --config.interactive=false`

Run development server

`gulp serve-dev`

Help: to see all gulp tasks run:

`gulp help`

# Using docker (WIP = Work In Progress - not stable)

Build the image

`docker build -t webimageallstarts:0.01 .`

Run the container

`docker run -t -i --name=weballstars -v $(pwd):/home/dev/app -p 3000:3000 webimageallstarts:0.01 /bin/bash`

Into the container, install npm packages and bower dependencies

`npm install && bower install --config.interactive=false`

Run development server

`gulp serve-dev`
