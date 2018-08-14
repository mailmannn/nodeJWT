FROM node:alpine

MAINTAINER andrepinheiro.projectos@gmail.com

COPY . /app

WORKDIR /app

CMD ["npm", "start"]