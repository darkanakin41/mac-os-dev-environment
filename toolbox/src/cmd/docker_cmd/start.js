const path = require('path')
const chalk = require('chalk');
const execSync = require('child_process').execSync;
const {getBaseCommand} = require('../../utils/docker-compose')

exports.command = 'start'
exports.desc = 'Start the full stack'
exports.builder = {}
exports.handler = function () {
    const projectName = path.parse(process.cwd()).base
    console.log(`${chalk.blue('[docker]')} ${projectName}: ${chalk.green('starting')}`)
    execSync(`${getBaseCommand()} up -d`)
}
