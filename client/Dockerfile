# Build Stage
FROM node:latest AS build

WORKDIR /Blocklytics/client

COPY package*.json ./
RUN npm install

COPY . ./

RUN npm run build

# Production Stage
FROM nginx:alpine

COPY --from=build /Blocklytics/client/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
