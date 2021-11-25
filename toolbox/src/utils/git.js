const simpleGit = require('simple-git')

const toReplace = {
  '.git': '',
  'git@github.com:': 'https://github.com/',
  '\n': '',
  '\r': '',
  '\t': ''
}

const getRemoteType = (remote) => {
  if (remote.indexOf('github.com') > -1) {
    return 'github'
  }
  return null
}

const getCurrentBranch = async (workdir) => {
  const git = simpleGit(workdir)

  const branches = await git.branch()

  return branches.current
}

const getPublicUrl = async (workdir) => {
  const git = simpleGit(workdir)

  let urls = await git.listRemote(['--get-url'])

  if (Array.isArray(urls)) {
    const urlsFormatted = urls.map((url) => {
      Object.keys(toReplace).forEach(key => {
        url = url.replace(key, toReplace[key])
      })
      return url
    })

    return urlsFormatted[0]
  }

  Object.keys(toReplace).forEach(key => {
    urls = urls.replace(key, toReplace[key])
  })

  return urls
}

const getPullRequestCreateUrl = async (workdir) => {
  const baseUrl = await getPublicUrl(workdir)

  const source = await getCurrentBranch(workdir)

  let target = 'preprod'
  if (source === 'preprod') {
    target = 'main'
  }

  switch (getRemoteType(baseUrl)) {
    case 'github':
      return `${baseUrl}/compare/${target}...${source}`
    default:
      return null
  }
}

const getPullRequestListUrl = async (workdir) => {
  const baseUrl = await getPublicUrl(workdir)

  switch (getRemoteType(baseUrl)) {
    case 'github':
      return `${baseUrl}/pulls`
    default:
      return null
  }
}

module.exports = { getRemoteType, getCurrentBranch, getPublicUrl, getPullRequestCreateUrl, getPullRequestListUrl }
