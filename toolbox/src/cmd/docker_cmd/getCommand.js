const {getBaseCommand} = require('../../utils/docker-compose')

exports.command = 'get-command'
exports.desc = 'Build docker-compose command'
exports.builder = {}
exports.handler = function () {
    console.log(getBaseCommand())
}
