var http = require('http');
http.globalAgent.maxSockets = Infinity;
http.createServer(function (req, res) {
    res.end('Hello World\n');
}).listen(1337, '127.0.0.1');