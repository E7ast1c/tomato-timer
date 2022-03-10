# expose by nginx built react app
FROM nginx:stable-alpine

COPY ./build /var/www
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]