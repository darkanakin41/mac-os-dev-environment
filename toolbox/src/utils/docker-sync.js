const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')

const getSyncs = (fileName) => {
  const currentWorkingDirectory = process.cwd()

  let dockerSyncFile = path.join(currentWorkingDirectory, 'docker-sync.yml')
  if(fileName){
    dockerSyncFile = path.join(currentWorkingDirectory, fileName)
  }
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

const getDockerComposes = (currentWorkingDirectory) => {
  if (currentWorkingDirectory === undefined) {
    currentWorkingDirectory = process.cwd()
  }

  const dockerSyncFile = path.join(currentWorkingDirectory, 'docker-sync.yml')
  if (!fs.existsSync(dockerSyncFile)) {
    console.error(`${dockerSyncFile} does not exist`)
    return 1
  }

  try {
    const doc = yaml.load(fs.readFileSync(dockerSyncFile, 'utf8'))
    if(doc.options['compose-file-path'] === undefined){
      if(fs.existsSync(path.join(currentWorkingDirectory, 'docker-compose.yml'))){
        return [path.join(currentWorkingDirectory, 'docker-compose.yml')]
      }
      console.error("No docker-compose.yml file found")
      return 1
    }

    return doc.options['compose-file-path'].map((filePath) => {
      return path.join(currentWorkingDirectory, filePath)
    })
  } catch (e) {
    console.error(e.message)
    return 1
  }
}

module.exports = { getSyncs: getSyncs, getDockerComposes: getDockerComposes }
