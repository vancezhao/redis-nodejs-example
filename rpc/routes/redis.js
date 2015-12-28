/**
 * Created by vancezhao on 15/12/26.
 */

var express = require('express');
var router = express.Router();
var redisPool = require('redis-connection-pool')('myRedisPool', {
    host: '133.130.120.86', // default
    port: 6379, //default
    max_clients: 30, // defalut
    perform_checks: false, // checks for needed push/pop functionality
    database: 0, // database number to use
    options: {
        auth_pass: 'password'
    } //options for createClient of node-redis, optional
});

var uuid = function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

router.get('/', function (req, res, next) {
    var oid = uuid();
    console.log(oid);
    redisPool.set(oid, 'foobar', function (err) {
        //redisPool.get(oid, function (err, reply) {
        //    console.log(reply); // 'foobar'
        //    res.send(reply);
        //});

        res.send(oid);
    });
});

module.exports = router;
