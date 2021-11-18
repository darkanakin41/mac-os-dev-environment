exports.command = 'mutagen <command>'
exports.desc = 'Mutagen management'
exports.builder = function (yargs) {
  return yargs.commandDir('mutagen_cmd')
}
exports.handler = function (argv) {}
