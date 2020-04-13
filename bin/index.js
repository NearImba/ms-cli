#!/usr/bin/env node

const program = require('commander')
const create = require('../src/create')
const package = require('../package')

function filterArgs(cmd) {
  const args = {}
  cmd.options.forEach(o => {
    const key = o.long.replace(/^--/, '')
    if (typeof cmd[key] !== 'function' && typeof cmd[key] !== 'undefined') {
      args[key] = cmd[key]
    }
  })
  return args
}

program
  .version(package.version, '-v, --version')

program
    .command('create [app]')
    .description('创建前端模版')
    .option('-t, --template <template-name>', '模版名称')
    .option('-s, --source <git-source>', 'git原地址')
    .action((app, cmd) => {
      const args = filterArgs(cmd)
      create(app, process.cwd(), args)
    })

program.parse(process.argv)

if (!process.argv.slice(2).length) {
    program.outputHelp()
}