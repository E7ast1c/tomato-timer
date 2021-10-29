# build react app and store in /app/build
FROM node:13.12.0-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . ./
RUN npm run build

# expose 80 port via nginx
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
