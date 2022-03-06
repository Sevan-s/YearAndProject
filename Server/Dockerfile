FROM node:17 as build

WORKDIR /app

COPY package*.json ./

COPY  . /app

ENV PORT 8080
ENV PATH /app/node_modules/.bin:$PATH

RUN npm install --silent
RUN npm install -g nodemon

EXPOSE 8080

CMD ["nodemon", ""]