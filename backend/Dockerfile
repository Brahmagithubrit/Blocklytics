FROM node:latest

WORKDIR /Blocklytics/backend

COPY package*.json ./
RUN npm install

COPY .  ./

EXPOSE 5000

CMD ["npm", "start"]
