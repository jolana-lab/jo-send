FROM node:lts-alpine

WORKDIR /jo-send

# Install node app
COPY package*.json ./
RUN npm ci

EXPOSE 3030