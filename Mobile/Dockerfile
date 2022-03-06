FROM node:12 as build

WORKDIR /app

COPY package*.json ./

COPY  . /app

# ENV PATH /app/node_modules/.bin:$PATH

# RUN npm install --silent
# RUN npm install -g eas-cli

# CMD ["eas", "build -p android --local"]

# # copy le binaire dans le volume partager
# ENTRYPOINT cp apk /apk/mobile.apk