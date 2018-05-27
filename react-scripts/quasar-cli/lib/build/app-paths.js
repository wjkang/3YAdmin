const
  fs = require('fs'),
  path = require('path'),
  resolve = path.resolve,
  join = path.join

function getAppDir () {
  let dir = process.cwd()

  while (dir.length > 1) {
    if (fs.existsSync(path.join(dir, 'quasar.conf.js'))) {
      return dir
    }

    dir = path.normalize(path.join(dir, '..'))
  }

  const
    logger = require('../helpers/logger')
    warn = logger('app:paths', 'red')

  warn(`Error. This command must be executed inside a Quasar v0.15+ project folder.`)
  warn(`For Quasar pre v0.15 projects, npm uninstall -g quasar-cli; npm i -g quasar-cli@0.6.5`)
  warn()
  process.exit(1)
}

const
  appDir = getAppDir(),
  cliDir = resolve(__dirname, '../..'),
  srcDir = resolve(appDir, 'src'),
  pwaDir = resolve(appDir, 'src-pwa'),
  cordovaDir = resolve(appDir, 'src-cordova'),
  electronDir = resolve(appDir, 'src-electron')

module.exports = {
  cliDir,
  appDir,
  srcDir,
  pwaDir,
  cordovaDir,
  electronDir,

  entryTemplateFile: resolve(cliDir, 'templates/app/entry.js'),
  entryFile: resolve(appDir, '.quasar/entry.js'),
  quasarTemplateFile: resolve(cliDir, 'templates/app/quasar.js'),
  quasarFile: resolve(appDir, '.quasar/quasar.js'),

  resolve: {
    cli: dir => join(cliDir, dir),
    app: dir => join(appDir, dir),
    src: dir => join(srcDir, dir),
    pwa: dir => join(pwaDir, dir),
    cordova: dir => join(cordovaDir, dir),
    electron: dir => join(electronDir, dir)
  }
}
