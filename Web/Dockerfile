FROM node:12 as build

WORKDIR /app

COPY package*.json ./

COPY  . /app

ENV PORT 8081
ENV PATH /app/node_modules/.bin:$PATH

RUN npm install --silent

EXPOSE 8081

CMD ["npm", "start"]