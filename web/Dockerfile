FROM node:9.5.0

WORKDIR /app

COPY ./package.json /app
COPY ./app.js /app
COPY ./controllers /app/controllers
COPY ./client /app/client

RUN ["npm", "install"]
RUN ["npm", "install", "--global", "gulp-cli"]

WORKDIR /app/client
RUN ["gulp"]
WORKDIR /app

EXPOSE 3000

ENTRYPOINT ["npm", "start"]
