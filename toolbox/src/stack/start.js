const { getSyncs } = require("../utils/docker-sync")
const mutagen = require('../mutagen')
const docker = require('../docker')

const startStack = () => {
    const syncs = getSyncs()
    if(syncs === 1){
        console.log("[stack] not a compatible folder")
        return
    }

    docker('start');
    mutagen('start');
}

module.exports = startStack
