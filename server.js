const http = require('http');

const app = require('./app');
const port = process.env.PORT || 3000;
//get it througn an environment variable e.g(Online servers u deploy your APIs on and defaultly you can hardcode it)

const server = http.createServer(app);

server.listen(port);