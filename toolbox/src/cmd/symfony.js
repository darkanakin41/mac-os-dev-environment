exports.command = 'symfony <command>'
exports.desc = 'Symfony tools'
exports.builder = function (yargs) {
  return yargs.commandDir('symfony_cmd')
}
exports.handler = function (argv) {}
