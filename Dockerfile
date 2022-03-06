FROM node:current as build

COPY  . /app

WORKDIR /app/Mobile

ENV PATH /app/Mobile/node_modules/.bin:$PATH

RUN npm install
RUN npm install -g expo-cli

RUN expo login -u DWS-area -p dws.area1

RUN npm install -g eas-cli

CMD ["eas", "build", "-p", "android", "--profile", "preview"]