const fs = require('fs')
const path = require('path')
const chalk = require('chalk');
const simpleGit = require('simple-git');
const { getSyncs } = require("../../utils/docker-sync")

exports.command = 'fetch'

exports.describe = 'Fetch related repositories'

exports.builder = {}

exports.handler = function(){
    const syncs = getSyncs()
    Object.keys(syncs).forEach((name) => {
        const config = syncs[name]
        if (!config.src) {
            return;
        }
        const syncedFolder = path.join(process.cwd(), config.src)
        const projectName = path.parse(syncedFolder).base
        if (!fs.existsSync(syncedFolder)) {
            console.error(`${chalk.blue('[git]')} ${projectName}: ${chalk.red('does not exist')}`)
            return 1
        }

        const git = simpleGit(syncedFolder)

        console.log(`${chalk.blue('[git]')} ${projectName}: ${chalk.keyword('orange')('fetch launched')}`)
        git.fetch().then(() => {
            console.log(`${chalk.blue('[git]')} ${projectName}: ${chalk.green('fetch done')}`)

        }).catch((err) => {
            console.error(`${chalk.blue('[git]')} ${projectName}: ${chalk.red('fetch failed')}\n${err.message}`)
        })
    })
}
