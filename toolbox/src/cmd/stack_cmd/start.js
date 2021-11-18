const { getSyncs } = require("../../utils/docker-sync")
const { handler: dockerStart } = require('../mutagen_cmd/start').handler;
const { handler: mutagenStart } = require('../docker_cmd/start').handler;

exports.command = 'start'

exports.describe = 'Start the whole stack (docker + mutagen)'

exports.builder = {}

exports.handler = function(argv){
    const syncs = getSyncs()
    if(syncs === 1){
        console.log("[stack] not a compatible folder")
        return
    }

    dockerStart(argv);
    mutagenStart(argv);
}
