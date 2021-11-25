const { getDockerComposes } = require('../utils/docker-sync')
const fs = require('fs')
const yaml = require('js-yaml')

const getBaseCommand = (workdir) => {
  const dockerComposes = getDockerComposes(workdir)
  if (Array.isArray(dockerComposes)) {
    return [
      'docker-compose',
      ...dockerComposes.map((file) => `-f ${file}`)
    ].join(' ')
  }
}

const getServiceConfig = (workdir, serviceName) => {
  const dockerComposes = getDockerComposes(workdir)
  let service = null
  dockerComposes.forEach((dockerCompose) => {
    const doc = yaml.load(fs.readFileSync(dockerCompose, 'utf8'))
    if (doc.services[serviceName]) {
      if (service) {
        const data = doc.services[serviceName]
        service = { ...service, ...data }
      } else {
        service = doc.services[serviceName]
      }
    }
  })
  return service
}

const getContainerName = (workdir, serviceName) => {
  const config = getServiceConfig(workdir, serviceName)
  if (config) {
    return config.container_name
  }
  return null
}

module.exports = { getBaseCommand: getBaseCommand, getContainerName }
