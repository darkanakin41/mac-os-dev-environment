const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')

const getSyncs = () => {
    const currentWorkingDirectory = process.cwd()

    const dockerSyncFile = path.join(currentWorkingDirectory, 'docker-sync.yml')
    if (!fs.existsSync(dockerSyncFile)) {
        console.error(`${dockerSyncFile} does not exist`)
        return 1
    }

    try {
        const doc = yaml.load(fs.readFileSync(dockerSyncFile, 'utf8'))
        return doc.syncs
    } catch (e) {
        console.error(e.message)
        return 1
    }
}

const getDockerComposes = () => {
    const currentWorkingDirectory = process.cwd()

    const dockerSyncFile = path.join(currentWorkingDirectory, 'docker-sync.yml')
    if (!fs.existsSync(dockerSyncFile)) {
        console.error(`${dockerSyncFile} does not exist`)
        return 1
    }

    try {
        const doc = yaml.load(fs.readFileSync(dockerSyncFile, 'utf8'))
        return doc.options['compose-file-path'].map((filePath) => {
            return path.join(currentWorkingDirectory, filePath)
        })
    } catch (e) {
        console.error(e.message)
        return 1
    }
}

module.exports = { getSyncs: getSyncs, getDockerComposes: getDockerComposes}