#! /usr/bin/env node

const yargs = require('yargs')
const docker = require('./docker/')
const mutagen = require('./mutagen/')
const stack = require('./stack/')
const git = require('./git/')

const usage = '\nUsage: docker-toolbox <module> <action>'

const cliTools = yargs.usage(usage)
cliTools.help(true)

cliTools.command('docker [action]', 'Manage docker', (yargs) => {
  return yargs.positional('action', {
    describe: 'start,stop,restart,getCommand',
    default: 'list'
  })
}, (argv) => {
  docker(argv.action)
})

cliTools.command('mutagen [action]', 'Manage mutagen', (yargs) => {
  return yargs.positional('action', {
    describe: 'start,stop,restart',
    default: '--help'
  })
}, (argv) => {
  mutagen(argv.action)
})

cliTools.command('stack [action]', 'Manage the full stack', (yargs) => {
  return yargs.positional('action', {
    describe: 'start,stop,restart',
    default: '--help'
  })
}, (argv) => {
  stack(argv.action)
})

cliTools.command('git [action]', 'Simple git actions', (yargs) => {
  return yargs.positional('action', {
    describe: 'update',
    default: '--help'
  })
}, (argv) => {
  git(argv.action)
})

cliTools.parse()
