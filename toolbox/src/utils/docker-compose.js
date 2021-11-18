const { getDockerComposes } = require('../utils/docker-sync')

const getBaseCommand = (workdir) => {
  const dockerComposes = getDockerComposes(workdir)
  if (Array.isArray(dockerComposes)) {
    return [
      'docker-compose',
      ...dockerComposes.map((file) => `-f ${file}`)
    ].join(' ')
  }
}

module.exports = { getBaseCommand: getBaseCommand }
