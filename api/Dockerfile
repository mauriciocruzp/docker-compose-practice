FROM node:16-alpine3.11

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 9002

CMD [ "node", "server.js" ]
