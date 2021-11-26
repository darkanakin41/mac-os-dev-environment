const path = require('path')
const fs = require('fs')
const chalk = require('chalk')
const yaml = require('js-yaml')

const TRAEFIK_NETWORK = 'traefik_network'
const TRAEFIK_EXCLUDED_SERVICES = ['mysql', 'redis', 'rabbitmq', 'elasticsearch', 'memcached']
const TRAEFIK_LABELS = [
  'traefik.http.routers.{{service-name}}.rule=Host(`{{service-host}}`)',
  'traefik.http.routers.{{service-name}}.service={{service-name}}',
  'traefik.http.services.{{service-name}}.loadbalancer.server.port={{service-port}}'
]

const extractData = (doc) => {
  const portsExposed = {}
  const aliases = {}
  Object.keys(doc.services).forEach((serviceName) => {
    if (TRAEFIK_EXCLUDED_SERVICES.indexOf(serviceName) !== -1) {
      return
    }
    if(!doc.services[serviceName].networks){
      doc.services[serviceName].networks = []
    }
    if (doc.services[serviceName].ports) {
      portsExposed[serviceName] = doc.services[serviceName].ports
      delete doc.services[serviceName].ports
    }
    if (!Array.isArray(doc.services[serviceName].networks) && typeof doc.services[serviceName].networks === 'object') {
      Object.keys(doc.services[serviceName].networks).forEach((networkName) => {
        if (doc.services[serviceName].networks[networkName].aliases) {
          aliases[serviceName] = []
          doc.services[serviceName].networks[networkName].aliases.forEach((alias) => {
            aliases[serviceName].push(alias)
          })
        }
      })
      doc.services[serviceName].networks[TRAEFIK_NETWORK] = {}
    }else{
      doc.services[serviceName].networks.push(TRAEFIK_NETWORK)
    }

  })

  return {portsExposed, aliases}
}

const handleExposedPorts = (doc, projectName, portsExposed) => {
  Object.keys(portsExposed).forEach((service) => {
    const portMapping = portsExposed[service][0].split(':')
    const internalPort = portMapping[1]

    let url = `${projectName}.project.local`
    if(service !== 'apache'){
      url = `${service}.${projectName}.project.local`
    }

    addLabels(doc, doc.services[service], `${projectName}-${service}`, url, internalPort)
  })
}
const handleAliases = (doc, projectName, aliases) => {
  Object.keys(aliases).forEach((serviceName) => {
    if(!doc.services[serviceName].labels){
      return;
    }
    aliases[serviceName].forEach((alias, index) => {
      doc.services[serviceName].labels.push(`traefik.http.routers.${projectName}-${serviceName}-${index}.rule=Host(\`${alias}\`)`)
      doc.services[serviceName].labels.push(`traefik.http.routers.${projectName}-${serviceName}-${index}.service=${projectName}-${serviceName}`)
    })
  })
}
const handleNetworks = (doc) => {
  if (!doc.networks) {
    doc.networks = {}
  }
  doc.networks[TRAEFIK_NETWORK] = {
    external: true,
    name: TRAEFIK_NETWORK
  }
}

const addLabels = (doc, serviceConfig, serviceName, serviceHost, internalPort) => {
  if(!serviceConfig.labels){
    serviceConfig.labels = []
  }
  if(serviceConfig.labels.indexOf('traefik.enable=true') === -1){
    serviceConfig.labels.push('traefik.enable=true')
  }

  TRAEFIK_LABELS.forEach((label) => {
    label = label.replace(/{{service-name}}/g, serviceName)
    label = label.replace(/{{service-host}}/g, serviceHost)
    label = label.replace(/{{service-port}}/g, internalPort)
    if (serviceConfig.labels.indexOf(label) === -1) {
      serviceConfig.labels.push(label)
    }
  })

}

exports.command = 'configure'

exports.describe = 'Configure the current project to work with traefik'

exports.builder = {}

exports.handler = function (argv) {
  const projectName = path.parse(process.cwd()).base
  const dockerComposeFile = path.join(process.cwd(), 'docker-compose.yml')

  if (!fs.existsSync(dockerComposeFile)) {
    console.log(chalk.red('The docker-compose.yml file is missing. Please run this command in a project folder.'))
    return
  }

  console.log(`${chalk.blue('[traefik]')} ${projectName}: ${chalk.blue('Starting configuration')}`)
  const doc = yaml.load(fs.readFileSync(dockerComposeFile, 'utf8'))

  const {portsExposed, aliases} = extractData(doc)

  handleExposedPorts(doc, projectName, portsExposed)
  handleAliases(doc, projectName, aliases)
  handleNetworks(doc)

  if (!argv.dryRun) {
    console.log(`${chalk.blue('[traefik]')} ${projectName}: ${chalk.blue('Creation of a backup')}`)
    fs.copyFileSync(dockerComposeFile, `${dockerComposeFile}.bak`)
    console.log(`${chalk.blue('[traefik]')} ${projectName}: ${chalk.blue('Writing to file')}`)
    fs.writeFileSync(dockerComposeFile, yaml.dump(doc))
    console.log(`${chalk.blue('[traefik]')} ${projectName}: ${chalk.green('Configuration done !')}`)
  } else {
    console.log(`${chalk.blue('[traefik]')} ${projectName}: ${chalk.green('Dry run result : ')}`)
    console.log(yaml.dump(doc))
  }
}
