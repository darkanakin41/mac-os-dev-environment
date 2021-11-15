const { getSyncs } = require("../utils/docker-sync")
const mutagen = require('../mutagen')
const docker = require('../docker')

const stopStack = () => {
    const syncs = getSyncs()
    if(syncs === 1){
        console.log("[stack] not a compatible folder")
        return
    }

    mutagen('stop');
    docker('stop');
}

module.exports = stopStack
