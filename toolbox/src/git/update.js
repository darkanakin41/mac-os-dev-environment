const fs = require('fs')
const path = require('path')
const chalk = require('chalk');
const execSync = require('child_process').execSync;
const {getBaseCommand} = require('../utils/docker-compose')

const simpleGit = require('simple-git');

const { getSyncs } = require("../utils/docker-sync")

const updateGit = () => {
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

        console.log(`${chalk.blue('[git]')} ${projectName}: ${chalk.keyword('orange')('update launched')}`)
        git.pull().then(() => {
            console.log(`${chalk.blue('[git]')} ${projectName}: ${chalk.green('update done')}`)

            const composerJson = path.join(syncedFolder, 'composer.json')
            if(fs.existsSync(composerJson)){
                const baseCommande = getBaseCommand(syncedFolder);
                if(!baseCommande){
                    return
                }
                console.log(`${chalk.blue('[composer]')} ${projectName}: ${chalk.keyword('orange')('install launched')}`)
                try{
                    execSync(`${getBaseCommand(syncedFolder)} exec --workdir /home/${projectName}/ -T php composer install`).toString()
                    console.error(`${chalk.blue('[composer]')} ${projectName}: ${chalk.green('install done')}`)
                }catch(error){
                    console.error(`${chalk.blue('[composer]')} ${projectName}: ${chalk.red('install failed')}`)
                }
            }
        }).catch((err) => {
            console.error(`${chalk.blue('[git]')} ${projectName}: ${chalk.red('update failed')}\n${err.message}`)
        })
    })
}

module.exports = updateGit
