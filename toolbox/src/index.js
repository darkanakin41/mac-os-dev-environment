#! /usr/bin/env node

const cliTools = require('yargs/yargs')(process.argv.slice(2))
cliTools.commandDir('cmd').demandCommand().help().argv

