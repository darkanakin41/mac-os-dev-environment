const fs = require('fs')
const path = require('path')
const chalk = require('chalk');
const execSync = require('child_process').execSync;
const { getSyncs } = require("../utils/docker-sync")

const {DOCKER_APACHE_CONTAINER, DOCKER_APACHE_USER, DOCKER_APACHE_GROUP} = require('../config')

const mutagenCommonOptions = [
    `--default-owner-beta ${DOCKER_APACHE_USER}`,
    `--default-group-beta ${DOCKER_APACHE_GROUP}`,
    '--default-directory-mode-beta 775',
    '--default-file-mode-beta 664',
    '--ignore=.git,.idea,var',
    '--sync-mode two-way-resolved ',
    '--symlink-mode posix-raw',
]

const startMutagen = () => {
    const syncs = getSyncs()
    Object.keys(syncs).forEach((name) => {
        const config = syncs[name]
        if(!config.src){
            return;
        }
        const syncedFolder = path.join(process.cwd(), config.src)
        const projectName = path.parse(syncedFolder).base
        if (!fs.existsSync(syncedFolder)) {
            console.error(`${chalk.blue('[mutagen]')} ${projectName}: ${chalk.red('does not exist')}`)
            return 1
        }

        try{
            execSync(`mutagen sync list | grep -c "${projectName}: <empty>"`).toString()
            console.error(`${chalk.blue('[mutagen]')} ${projectName}: ${chalk.keyword('orange')('already in sync')}`)
        }catch(error){
            const command = [
                'mutagen',
                'sync',
                'create',
                syncedFolder,
                `docker://root@${DOCKER_APACHE_CONTAINER}/home/${projectName}`,
                `--name=${projectName}`,
                `--label ${projectName}`,
                ...mutagenCommonOptions
            ]
            console.error(`${chalk.blue('[mutagen]')} ${projectName}: ${chalk.green('starting synchronisation')}`)
            execSync(command.join(' '))
        }
    })
}

module.exports = startMutagen
