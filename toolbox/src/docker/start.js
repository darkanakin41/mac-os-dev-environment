const path = require('path')
const chalk = require('chalk');
const execSync = require('child_process').execSync;
const {getBaseCommand} = require('../utils/docker-compose')

const startDocker = () => {
    const projectName = path.parse(process.cwd()).base
    console.log(`${chalk.blue('[docker]')} ${projectName}: ${chalk.green('starting')}`)
    execSync(`${getBaseCommand()} up -d`)
}

module.exports = startDocker
