const {getBaseCommand} = require('../utils/docker-compose')

const stopDocker = () => {
    console.log(getBaseCommand())
}

module.exports = stopDocker
