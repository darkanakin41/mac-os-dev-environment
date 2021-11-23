const path = require('path')
const chalk = require('chalk');
const open = require('open');
const { getPublicUrl } = require('../../utils/git')

exports.command = 'online'

exports.describe = 'Open git repository in web browser'

exports.builder = {}

exports.handler = async function () {
    const projectName = path.parse(process.cwd()).base

    const url = await getPublicUrl(process.cwd())

    if (url) {
        console.log(`${chalk.blue('[git]')} ${projectName}: ${chalk.green('opening repo in browser')}`)
        open(url)
    } else {
        console.error(`${chalk.blue('[git]')} ${projectName}: ${chalk.red('not url found')}`)
    }
}
