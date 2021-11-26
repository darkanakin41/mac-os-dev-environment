exports.command = 'traefik <command>'
exports.desc = 'Traefik tools'
exports.builder = function (yargs) {
  return yargs.commandDir('traefik_cmd')
}
exports.handler = function (argv) {}
