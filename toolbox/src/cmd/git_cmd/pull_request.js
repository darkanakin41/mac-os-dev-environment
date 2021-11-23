const path = require('path')
const chalk = require('chalk');
const open = require('open');
const { getPullRequestCreateUrl, getPullRequestListUrl } = require('../../utils/git')

exports.command = 'pull-request'

exports.describe = 'Open the pull request screen creation for the repository in web browser'

exports.builder = {
    list: {
        default: true,
        describe: 'Display the list of pull requests',
    },
    create: {
        default: false,
        describe: 'Open the creation page for Pull Requests',
    }
}

exports.handler = async function (argv) {
    const projectName = path.parse(process.cwd()).base

    let url = null

    if(argv.list){
        url = await getPullRequestListUrl(process.cwd())
    }else if(argv.create){
        url = await getPullRequestCreateUrl(process.cwd())
    }
    if (url) {
        console.log(`${chalk.blue('[git]')} ${projectName}: ${chalk.green('opening pull request page in browser')}`)
        open(url)
    } else {
        console.error(`${chalk.blue('[git]')} ${projectName}: ${chalk.red('not url found')}`)
    }
}
