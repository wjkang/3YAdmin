const
  fs = require('fs'),
  fse = require('fs-extra'),
  appPaths = require('../build/app-paths'),
  logger = require('../helpers/logger'),
  log = logger('app:mode-electron'),
  warn = logger('app:mode-electron', 'red'),
  spawn = require('../helpers/spawn')

const
  electronDeps = {
    'electron': '1.8.3',
    'electron-packager': '11.1.0',
    'electron-debug': '1.5.0',
    'electron-devtools-installer': '2.2.1',
    'devtron': '1.4.0'
  }

class Mode {
  get isInstalled () {
    return fs.existsSync(appPaths.electronDir)
  }

  add (params) {
    if (this.isInstalled) {
      warn(`Electron support detected already. Aborting.`)
      return
    }

    log(`Installing Electron dependencies...`)
    spawn.sync(
      'npm',
      ['install', '--save-dev', '--save-exact'].concat(Object.keys(electronDeps).map(dep => {
        return `${dep}@${electronDeps[dep]}`
      })),
      appPaths.appDir,
      () => warn('Failed to install Electron dependencies')
    )

    log(`Creating Electron source folder...`)
    fse.copySync(appPaths.resolve.cli('templates/electron'), appPaths.electronDir)
    log(`Electron support was added`)
  }

  remove () {
    if (!this.isInstalled) {
      warn(`No Electron support detected. Aborting.`)
      return
    }

    log(`Removing Electron source folder`)
    fse.removeSync(appPaths.electronDir)

    log(`Uninstalling Electron dependencies...`)
    spawn.sync(
      'npm',
      ['uninstall', '--save-dev'].concat(Object.keys(electronDeps)),
      appPaths.appDir,
      () => warn('Failed to uninstall Electron dependencies')
    )

    log(`Electron support was removed`)
  }
}

module.exports = Mode
