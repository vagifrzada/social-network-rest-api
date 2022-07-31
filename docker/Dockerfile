FROM node:18.4.0-slim

WORKDIR /app

COPY package*.json ./
RUN npm i

COPY . .

ENV PORT 3000

EXPOSE ${PORT}

CMD [ "node", "server.js" ]