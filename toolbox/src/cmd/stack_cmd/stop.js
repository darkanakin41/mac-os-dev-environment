const { getSyncs } = require("../../utils/docker-sync")
const { handler: dockerStop } = require('../docker_cmd/stop')
const { handler: mutagenStop } = require('../mutagen_cmd/stop')

exports.command = 'stop'

exports.describe = 'Stop the whole stack (docker + mutagen)'

exports.builder = {}

exports.handler = function(argv){
    const syncs = getSyncs()
    if(syncs === 1){
        console.log("[stack] not a compatible folder")
        return
    }

    mutagenStop(argv);
    dockerStop(argv);
}
