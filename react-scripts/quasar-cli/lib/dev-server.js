const
  chalk = require('chalk'),
  path = require('path'),
  opn = require('opn'),
  express = require('express'),
  webpack = require('webpack'),
  webpackDevServer = require('webpack-dev-server')

const
  log = require('./helpers/logger')('app:dev-server'),
  notify = require('./helpers/notifier')

let alreadyNotified = false

class DevServer {
  constructor (quasarConfig) {
    this.quasarConfig = quasarConfig
  }

  async listen () {
    const
      webpackConfig = this.quasarConfig.getWebpackConfig(),
      cfg = this.quasarConfig.getBuildConfig()

    log(`Booting up...`)
    log()

    return new Promise((resolve, reject) => {
      this.compiler = webpack(webpackConfig)
      this.compiler.plugin('done', compiler => {
        if (this.__started) { return }

        // start dev server if there are no errors
        if (compiler.compilation.errors && compiler.compilation.errors.length > 0) {
          return
        }

        this.__started = true

        this.server.listen(cfg.devServer.port, cfg.devServer.host, () => {
          resolve()

          if (alreadyNotified) { return }
          alreadyNotified = true

          if (cfg.ctx.mode.cordova) {
            return
          }

          if (cfg.devServer.open) {
            opn(cfg.build.APP_URL)
          }
          else if (cfg.build.useNotifier) {
            notify({
              subtitle: `App is ready for dev`,
              message: `Listening at ${cfg.build.APP_URL}`,
              onClick: () => {
                opn(cfg.build.APP_URL)
              }
            })
          }
        })
      })

      // start building & launch server
      this.server = new webpackDevServer(this.compiler, cfg.devServer)
    })
  }

  stop () {
    if (this.server) {
      log(`Shutting down`)
      this.server.close()
      this.server = null
    }
  }
}

module.exports = DevServer
