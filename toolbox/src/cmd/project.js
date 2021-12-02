exports.command = 'project <command>'
exports.desc = 'Project tools'
exports.builder = function (yargs) {
  return yargs.commandDir('project_cmd')
}
exports.handler = function (argv) {}
