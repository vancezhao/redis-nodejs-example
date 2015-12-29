/**
 * Created by vancezhao on 15/12/27.
 */
var cluster = require('cluster');
var os = require('os');
var restify = require('restify');
var Redis = require('ioredis');
var redis = new Redis({
    port: 6379,          // Redis port
    host: '133.130.120.86',   // Redis host
    family: 4,           // 4 (IPv4) or 6 (IPv6)
    password: 'auth',
    db: 0
});
var pipeline = redis.pipeline();

var uuid = function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

if (cluster.isMaster) {
    for (var i = 0; i < os.cpus().length; i++)
        cluster.fork();

    return cluster.on('death', function (worker) {
        console.error('worker %d died', worker.pid);
    });
}

var server = restify.createServer();

server.use(restify.queryParser());
server.get('/redis', function handle(req, res, next) {
    res.contentType = 'json';
    var myUUID = uuid;
    pipeline
        .set(myUUID(), myUUID())
        .exec(function (err, results) {
            //console.log('result is: ' + result);

        });
    res.send({hello: req.params.name});
});

server.get('/', function handle(req, res, next) {
    res.contentType = 'json';
    res.send({hello: req.params.name});
});

server.listen(9080, function () {
    console.log('listening: %s', server.url);
});
