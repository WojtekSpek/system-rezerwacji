FROM node:18.0.0-alpine

RUN apk update && apk upgrade && \
    apk add --no-cache git

WORKDIR /usr/src/app

COPY ./package.json ./
RUN npm install --production && npm cache clean --force

COPY . .

ENV NODE_ENV=production

EXPOSE 3000 5000 8080 80 443 

CMD ["node", "server.js"]
