from node:alpine

WORKDIR /usr/src/app

RUN npm install -g http-server pm2

COPY process.json ./
RUN chmod +x process.json

COPY /public/* ./

EXPOSE 8080 8081 8082

# Actual script to start can be overridden from `docker run`
CMD ["pm2", "start", "process.json", "--no-daemon"]