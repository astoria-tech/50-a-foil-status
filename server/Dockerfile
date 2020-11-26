# Base image
FROM node:14.15

WORKDIR /srv

# Add node dependencies and install
ADD package.json package-lock.json ./
RUN npm install

# Add code
ADD src /srv/src
ADD bin /srv/bin

# Default command to run on startup
CMD npm run dev
