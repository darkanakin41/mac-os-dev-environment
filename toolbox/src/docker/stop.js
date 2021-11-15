const path = require('path')
const chalk = require('chalk');
const execSync = require('child_process').execSync;
const {getBaseCommand} = require('../utils/docker-compose')

const stopDocker = () => {
    const projectName = path.parse(process.cwd()).base
    console.log(`${chalk.blue('[docker]')} ${projectName}: ${chalk.red('stopping')}`)
    execSync(`${getBaseCommand()} down`)
}

module.exports = stopDocker
