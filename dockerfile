FROM node:alpine

MAINTAINER andrepinheiro

COPY . /app

WORKDIR /app

CMD ["npm", "start"]