exports.command = 'git <command>'
exports.desc = 'Git management'
exports.builder = function (yargs) {
  return yargs.commandDir('git_cmd')
}
exports.handler = function (argv) {}
