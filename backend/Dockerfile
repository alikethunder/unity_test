FROM node:16.16.0

WORKDIR /app

COPY package.json .

RUN npm install

RUN npm install -g nodemon@1.19.1

COPY . .

EXPOSE 8080

CMD ["npm","start"]