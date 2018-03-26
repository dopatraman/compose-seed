FROM node:9.5.0

WORKDIR /app

COPY ./package.json /app
COPY ./app.js /app
COPY ./controllers /app/controllers
COPY ./service /app/service

EXPOSE 80

RUN ["npm", "install"]
ENTRYPOINT ["npm", "start"]
