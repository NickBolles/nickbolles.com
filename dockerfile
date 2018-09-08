from node:alpine

WORKDIR /usr/src/app

RUN npm install -g http-server

COPY docker-entrypoint.sh ./

COPY /public/* ./

EXPOSE 80 81 82

CMD ["./docker-entrypoint.sh"]
