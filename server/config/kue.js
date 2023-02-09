const kue = require('kue');

var queue = kue.createQueue({
    redis: process.env.REDIS
});

module.exports.queue = queue;