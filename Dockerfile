# NODE LTS image
FROM node:4.4

# Set the directory to work
WORKDIR /home/app

# Put all project files
COPY . /home/app

# Install dependencies
RUN npm install -g gulp bower

# The command to run our app when the container is run
#CMD ["gulp", "server"]

EXPOSE 3000
