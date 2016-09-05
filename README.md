# Belatrix Connect Web Application

Install NodeJS, Bower, GulpJS

then install

npm install -g bower-installer

execute

- From the terminal in the same directory as your bower.json file, enter:

bower-installer

finally use:

gulp server

## Using docker (WIP = Work In Progress)

Build the image
```docker build -t webimageallstarts:0.01 .```

Run the container
```docker run -t -i --name=weballstars -v $(pwd):/home/dev/app -p 3000:3000 webimageallstarts:0.01 /bin/bash```

Install npm packages and bower dependencies
```npm install && bower install --config.interactive=false --allow-root```
