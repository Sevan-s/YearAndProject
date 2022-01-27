FROM node:12 as build

WORKDIR /app

COPY package*.json ./

COPY  . /app

ENV PORT 3000
ENV PATH /app/node_modules/.bin:$PATH

RUN npm install --silent

EXPOSE 3000

CMD ["npm", "start"]