const fs = require('fs')
const path = require('path')
const chalk = require('chalk');
const execSync = require('child_process').execSync;
const { getSyncs } = require("../../utils/docker-sync")

const {DOCKER_APACHE_USER, DOCKER_APACHE_GROUP} = require('../../config')
const { getContainerName } = require('../../utils/docker-compose')

const mutagenCommonOptions = [
    `--default-owner-beta ${DOCKER_APACHE_USER}`,
    `--default-group-beta ${DOCKER_APACHE_GROUP}`,
    '--default-directory-mode-beta 775',
    '--default-file-mode-beta 664',
    '--ignore=.git,.idea,.docker,var',
    '--sync-mode two-way-resolved ',
    '--symlink-mode posix-raw',
]

exports.command = 'start'

exports.describe = 'Start mutagen synchronization'

exports.builder = {}

exports.handler = function(){
    const syncs = getSyncs()
    const syncsDist = getSyncs('docker-sync.yml.dist')

    let separator = false
    Object.keys(syncsDist).forEach((name) => {
        if(!syncs[name]) {
            console.log(`${chalk.keyword('orange')('[mutagen]')} ${path.parse(process.cwd()).base}: ${name} is not defined in docker-sync.yml`)
            separator = true
        }
    })
    if(separator){
        console.log("---------------------------------------------------------")
        separator = false
    }
    Object.keys(syncs).forEach((name) => {
        if(!syncsDist[name]) {
            console.log(`${chalk.keyword('orange')('[mutagen]')} ${path.parse(process.cwd()).base}: ${name} is not defined in docker-sync.yml.dist`)
            separator = true
        }
    })
    if(separator){
        console.log("---------------------------------------------------------")
    }
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
                `docker://root@${getContainerName(process.cwd(), 'apache')}/home/${projectName}`,
                `--name=${projectName}`,
                `--label ${projectName}`,
                ...mutagenCommonOptions
            ]
            console.error(`${chalk.blue('[mutagen]')} ${projectName}: ${chalk.green('starting synchronisation')}`)
            execSync(command.join(' '))
        }
    })
}
