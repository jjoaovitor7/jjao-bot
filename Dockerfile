FROM node:lts-alpine
RUN apk add --update --no-cache git
WORKDIR /usr/src/app
COPY . .
# RUN git clone https://github.com/jjoaovitor7/jjao-bot
RUN npm i -g pm2
RUN npm i
ENTRYPOINT ["pm2-runtime", "index.js"]