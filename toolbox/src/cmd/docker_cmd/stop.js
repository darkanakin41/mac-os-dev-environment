const path = require('path')
const chalk = require('chalk');
const execSync = require('child_process').execSync;
const {getBaseCommand} = require('../../utils/docker-compose')

exports.command = 'stop'
exports.desc = 'Stop the full stack'
exports.builder = {}
exports.handler = function () {
    const projectName = path.parse(process.cwd()).base
    console.log(`${chalk.blue('[docker]')} ${projectName}: ${chalk.red('stopping')}`)
    execSync(`${getBaseCommand()} down`)
}
