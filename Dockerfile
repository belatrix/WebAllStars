# NODE LTS image
FROM node:4.5-slim
MAINTAINER Jose Sal y Rosas <infojasyrc@gmail.com>

RUN apt-get update && apt-get install -y --no-install-recommends \
    git \
    && apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Install dependencies
RUN npm install -g gulp bower \
    nodemon generator-hottowel

# Create a user
RUN useradd -ms /bin/bash dev

# Use dev user
USER dev

# Set the directory to work
WORKDIR /home/dev/app

# Put all project files
COPY . /home/dev/app

EXPOSE 3000 3001 8001
