const path = require('path')
const fs = require('fs')
const chalk = require('chalk')

exports.command = 'restore'

exports.describe = 'Add the configuration needed to open idea from profiler'

exports.builder = {}

exports.handler = function () {
  const projectName = path.parse(process.cwd()).base
  const backup = path.join(process.cwd(), 'docker-compose.yml.bak')
  if (!fs.existsSync(backup)) {
    console.log(`${chalk.blue('[traefik]')} ${projectName}: ${chalk.red('backup does not exist')}`)
    return 1
  }
  try {
    const target = path.join(process.cwd(), 'docker-compose.yml')
    if (fs.existsSync(target)) {
      fs.unlinkSync(target)
    }
    fs.copyFileSync(backup, target)
    console.log(`${chalk.blue('[symfony]')} ${projectName}: ${chalk.green('backup restored')}`)
  } catch (e) {
    console.log(`${chalk.blue('[symfony]')} ${projectName}: ${chalk.red('backup not restored, an error occured : ')}\n${e.message}`)
  }
}
