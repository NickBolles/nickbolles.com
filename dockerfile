from node:alpine

WORKDIR /usr/src/app

RUN npm install -g http-server pm2

COPY server.js ./
RUN chmod +x server.js
COPY /public/* ./

EXPOSE 8080 8081 8082

# Actual script to start can be overridden from `docker run`
CMD ["server.js"]
