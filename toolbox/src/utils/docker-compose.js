const {getDockerComposes} = require('../utils/docker-sync')

const getBaseCommand = () => {
    return [
        'docker-compose',
        ...getDockerComposes().map((file) => `-f ${file}`)
    ].join(' ');
}

module.exports = {getBaseCommand: getBaseCommand}
