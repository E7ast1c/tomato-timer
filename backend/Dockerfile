FROM alpine:latest
WORKDIR /app
RUN cd /app

COPY /tomato-timer /app/tomato-timer

EXPOSE ${BACKEND_PORT}
RUN apk add --no-cache libc6-compat
RUN apk add --no-cache bash

ENTRYPOINT ["./tomato-timer"]