exports.command = 'stack <command>'
exports.desc = 'Stack management'
exports.builder = function (yargs) {
  return yargs.commandDir('stack_cmd')
}
exports.handler = function (argv) {}
