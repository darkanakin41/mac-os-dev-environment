const fs = require('fs')
const path = require('path')
const chalk = require('chalk');
const execSync = require('child_process').execSync;
const { getSyncs } = require("../../utils/docker-sync")


exports.command = 'stop'

exports.describe = 'Stop mutagen synchronization'

exports.builder = {}

exports.handler = function(){
    const syncs = getSyncs()
    Object.keys(syncs).forEach((name) => {
        const config = syncs[name]
        if(!config.src){
            return;
        }
        const syncedFolder = path.join(process.cwd(), config.src)
        const projectName = path.parse(syncedFolder).base
        if (!fs.existsSync(syncedFolder)) {
            console.log(`${chalk.blue('[mutagen]')} ${projectName}: ${chalk.red('does not exist')}`)
            return 1
        }

        try{
            execSync(`mutagen sync list | grep -c "${projectName}: <empty>"`).toString()
            console.log(`${chalk.blue('[mutagen]')} ${projectName}: ${chalk.green('terminating synchronisation')}`)
            execSync(`mutagen sync terminate --label-selector "${projectName}"`)
        }catch(error){
            console.log(`${chalk.blue('[mutagen]')} ${projectName}: ${chalk.keyword('orange')('not in sync')}`)
        }
    })
}
