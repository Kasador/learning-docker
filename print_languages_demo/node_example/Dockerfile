FROM node:latest
COPY package*.json ./
WORKDIR /usr/src/app
RUN npm install
COPY . . 
EXPOSE 3000:3000
CMD ["node", "hello.js"]