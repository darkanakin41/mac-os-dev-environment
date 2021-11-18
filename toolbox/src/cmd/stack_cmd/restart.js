const start = require('./start').handler;
const stop = require('./stop').handler;

exports.command = 'restart'
exports.desc = 'Restart the full stack'
exports.builder = {}
exports.handler = function (argv) {
    stop(argv)
    start(argv)
}
