const
  fs = require('fs'),
  fse = require('fs-extra'),
  dirname = require('path').dirname,
  compileTemplate = require('lodash.template')

const
  log = require('./helpers/logger')('app:generator')
  appPaths = require('./build/app-paths'),
  destAppStylFile = appPaths.resolve.app('.quasar/app.styl')

class Generator {
  constructor () {
    this.entryTemplate = compileTemplate(fs.readFileSync(appPaths.entryTemplateFile, 'utf-8'))
    this.quasarTemplate = compileTemplate(fs.readFileSync(appPaths.quasarTemplateFile, 'utf-8'))
  }

  build (quasarConfig) {
    log(`Generating Webpack entry point`)
    const data = quasarConfig.getBuildConfig()

    fse.mkdirpSync(dirname(appPaths.entryFile))
    fs.writeFileSync(appPaths.entryFile, this.entryTemplate(data), 'utf-8')
    fs.writeFileSync(appPaths.quasarFile, this.quasarTemplate(data), 'utf-8')

    const
      now = Date.now() / 1000,
      then = now - 10

    fs.utimes(appPaths.entryFile, then, then, function (err) { if (err) throw err })
    fs.utimes(appPaths.quasarFile, then, then, function (err) { if (err) throw err })

    if (!fse.existsSync(destAppStylFile)) {
      const
        appVariablesFile = appPaths.resolve.cli('templates/app/variables.styl'),
        appStylFile = appPaths.resolve.cli('templates/app/app.styl'),
        destAppVariablesFile = appPaths.resolve.app('.quasar/variables.styl')

      fse.copySync(appStylFile, destAppStylFile)
      fs.utimes(destAppStylFile, then, then, function (err) { if (err) throw err })

      fse.copySync(appVariablesFile, destAppVariablesFile)
      fs.utimes(destAppVariablesFile, then, then, function (err) { if (err) throw err })
    }
  }
}

module.exports = Generator
