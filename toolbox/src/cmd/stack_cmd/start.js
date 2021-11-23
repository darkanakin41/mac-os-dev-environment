const { getSyncs } = require("../../utils/docker-sync")
const { handler: mutagenStart } = require('../mutagen_cmd/start');
const { handler: dockerStart } = require('../docker_cmd/start');

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
