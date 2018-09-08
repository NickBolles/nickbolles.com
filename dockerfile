from node:alpine

WORKDIR /usr/src/app

RUN npm install -g http-server

COPY docker-entrypoint.sh ./
RUN chmod +x docker-entrypoint.sh
COPY /public/* ./

EXPOSE 80 81 82

ENTRYPOINT ["./docker-entrypoint.sh"]
