var http=require('http-server')

http.createServer({root: './vue', port: 8080});
//http.createServer({root: './react', port: 8081});
http.createServer({root: './html', port: 8082});
console.log("servers running")