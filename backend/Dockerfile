FROM alpine:latest

WORKDIR /app

COPY ./build ./

RUN apk add --no-cache libc6-compat
RUN apk add --no-cache bash

EXPOSE ${API_PORT}
CMD ["/app/build"]