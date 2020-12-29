FROM node:12-alpine

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn install

ADD . /usr/src/app

ENV PORT 5000
EXPOSE 5000

CMD [ "node", "src/server.js" ]
