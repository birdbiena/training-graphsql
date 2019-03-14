FROM node:8.12.0

WORKDIR /usr/src/app

COPY ./package*.json ./

RUN npm install

COPY ./ ./

CMD [ "npm", "run", "server" ]