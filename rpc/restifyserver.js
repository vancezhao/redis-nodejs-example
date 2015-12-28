/**
 * Created by vancezhao on 15/12/27.
 */
var cluster = require('cluster');
var os = require('os');

var restify = require('restify');

if (cluster.isMaster) {
    for (var i = 0; i < os.cpus().length; i++)
        cluster.fork();


    return cluster.on('death', function(worker) {
        console.error('worker %d died', worker.pid);
    });
}

var server = restify.createServer();
server.use(restify.queryParser());
server.get('/', function handle(req, res, next) {
    res.contentType = 'json';
    res.send({hello: req.params.name});
});

server.listen(9080, function() {
    console.log('listening: %s', server.url);
});
