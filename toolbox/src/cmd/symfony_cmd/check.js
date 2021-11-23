const path = require('path')
const fs = require('fs')
const chalk = require('chalk')
const execSync = require('child_process').execSync

const {SYMFONY_CHECKS} = require('../../config')

const getComposeContent = () => {
  const composerJson = path.join(process.cwd(), 'composer.json')
  if (!fs.existsSync(composerJson)) {
    return null
  }
  const content = fs.readFileSync(composerJson, 'utf8')
  return JSON.parse(content)
}

const composerHasPackage = (packageName) => {
  const content = getComposeContent()
  if (content === null) {
    return false
  }
  return content.require && (content.require[packageName] || content['require-dev'][packageName])
}

const checkComposer = (projectName, workingDir) => {
  const composerJson = path.join(workingDir, 'composer.json')
  if (!fs.existsSync(composerJson)) {
    console.log(`${chalk.blue('[symfony]')} ${projectName}: ${chalk.red('No composer.json in current project')}`)
    return 1
  }

  execSync('composer validate')
}

const packageCheck = (projectName, packageName, actions) => {
  if (composerHasPackage(packageName)) {
    console.log(`${chalk.blue('[symfony]')} ${projectName}: ${chalk.green(`${packageName} is installed`)}`)
    actions.forEach(action => {
      try {
        execSync(action)
        console.log(`${chalk.keyword('orange')(`[${packageName}]`)} "${action}": ${chalk.green('validated')}`)
      } catch (e) {
        console.log(`${chalk.keyword('orange')(`[${packageName}]`)} "${action}": ${chalk.red('not validated')}\n${e.message}`)
      }
    })
  } else {
    console.log(`${chalk.blue('[symfony]')} ${projectName}: ${chalk.red(`${packageName} is not installed`)}`)
  }
}

exports.command = 'check'

exports.describe = 'Execute some checks on the current symfony project'

exports.builder = {}

exports.handler = function () {
  const projectName = path.parse(process.cwd()).base

  checkComposer(projectName, process.cwd())

  Object.keys(SYMFONY_CHECKS).forEach(packageName => {
    packageCheck(projectName, packageName, SYMFONY_CHECKS[packageName])
  })
}
