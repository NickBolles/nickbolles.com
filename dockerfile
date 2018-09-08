 /usr/src/app

RUN npm install http-server

COPY server.js ./
RUN chmod +x server.js
COPY /public/* ./

EXPOSE 8080 8081 8082

# Actual script to start can be overridden from `docker run`
CMD ["node", "server.js"]