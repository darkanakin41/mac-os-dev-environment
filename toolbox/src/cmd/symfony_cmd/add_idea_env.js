const path = require('path')
const fs = require('fs')
const chalk = require('chalk');

exports.command = 'add-idea-env'

exports.describe = 'Add the configuration needed to open idea from profiler'

exports.builder = {}

exports.handler = function(){
  const projectName = path.parse(process.cwd()).base
  const envLocal = path.join(process.cwd(), '.env.local')
  if (!fs.existsSync(envLocal)) {
    console.log(`${chalk.blue('[symfony]')} ${projectName}: ${chalk.red('.env.local does not exist')}`)
    return 1
  }

  const content = fs.readFileSync(envLocal, 'utf8')
  if(content.indexOf('IDE_PATH') !== -1){
    console.log(`${chalk.blue('[symfony]')} ${projectName}: ${chalk.green('.env.local already up to date')}`)
    return 1
  }

  let toAdd = `IDE_PATH="idea://open?file=%f&line=%%l&/home/${projectName}>${process.cwd().replace(/^\/+/g, '')}"`

  try{
    fs.appendFileSync(envLocal, toAdd)
    console.log(`${chalk.blue('[symfony]')} ${projectName}: ${chalk.green('.env.local updated')}`)
  }catch(e){
    console.log(`${chalk.blue('[symfony]')} ${projectName}: ${chalk.red('.env.local not updated, an error occured : ')}\n${e.message}`)
  }
}
