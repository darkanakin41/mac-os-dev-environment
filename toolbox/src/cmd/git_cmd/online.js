const path = require('path')
const chalk = require('chalk');
const open = require('open');
const simpleGit = require('simple-git');

const toReplace = {
    '.git' : '',
    'git@github.com:': 'https://github.com/',
    '\n':'',
    '\r':'',
    '\t':'',
}

exports.command = 'online'

exports.describe = 'Open git repository in web browser'

exports.builder = {}

exports.handler = function(){
    const projectName = path.parse(process.cwd()).base

    const git = simpleGit(process.cwd())

    git.listRemote(['--get-url'], (err, data) => {
        Object.keys(toReplace).forEach(key => {
            data = data.replace(key, toReplace[key])
        })
        if(data){
            console.log(`${chalk.blue('[git]')} ${projectName}: ${chalk.green('opening repo in browser')}`)
            open(data)
        }else{
            console.error(`${chalk.blue('[git]')} ${projectName}: ${chalk.red('not url found')}`)
        }
    })
}
