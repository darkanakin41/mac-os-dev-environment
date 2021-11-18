exports.command = 'docker <command>'
exports.desc = 'Docker management'
exports.builder = function (yargs) {
  return yargs.commandDir('docker_cmd')
}
exports.handler = function (argv) {}
