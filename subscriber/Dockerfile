FROM node:12-alpine

WORKDIR /usr/src/app

COPY . ./

RUN npm install

EXPOSE 3000

ENTRYPOINT [ "npm", "run", "start" ]