const
  fs = require('fs'),
  dirname = require('path').dirname,
  fse = require('fs-extra')

const
  appPaths = require('./app-paths'),
  filePath = appPaths.resolve.app('.quasar/artifacts.json'),
  log = require('../helpers/logger')('app:artifacts')

function exists () {
  return fs.existsSync(filePath)
}

function getArtifacts () {
  return exists()
    ? require(filePath)
    : { folders: [] }
}

function save (content) {
  fse.mkdirp(dirname(filePath))
  fs.writeFileSync(filePath, JSON.stringify(content), 'utf-8')
}

module.exports.add = function (entry) {
  const content = getArtifacts()

  if (!content.folders.includes(entry)) {
    content.folders.push(entry)
    save(content)
    log(`Added build artifact "${entry}"`)
  }
}

module.exports.clean = function (entry) {
  const folder = appPaths.resolve.app(entry)
  fse.removeSync(folder)
  log(`Cleaned build artifact: "${folder}"`)
}

module.exports.cleanAll = function () {
  const content = getArtifacts()

  content.folders.forEach(name => {
    const folder = appPaths.resolve.app(name)

    if (name === 'src-cordova/www') {
      fse.emptyDirSync(folder)
    }
    else {
      fse.removeSync(folder)
    }

    log(`Cleaned build artifact: "${folder}"`)
  })

  fse.removeSync(appPaths.resolve.app('.quasar'))
}
