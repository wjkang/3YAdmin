const warn = require('./logger')('app:ensure-argv', 'red')

module.exports = function (argv, cmd) {
  if (cmd === 'mode') {
    if (![undefined, 'pwa', 'cordova', 'electron'].includes(argv.add)) {
      warn(`Unknown mode "${ argv.add }" to add`)
      warn()
      process.exit(1)
    }
    if (![undefined, 'pwa', 'cordova', 'electron'].includes(argv.remove)) {
      warn(`Unknown mode "${ argv.remove }" to remove`)
      warn()
      process.exit(1)
    }

    return
  }

  if (!['spa', 'pwa', 'cordova', 'electron'].includes(argv.mode)) {
    warn(`Unknown mode "${ argv.mode }"`)
    warn()
    process.exit(1)
  }

  if (!['mat', 'ios'].includes(argv.theme)) {
    warn(`Unknown theme "${ argv.theme }"`)
    warn()
    process.exit(1)
  }

  if (argv.mode === 'cordova') {
    const targets = ['android', 'ios', 'blackberry10', 'browser', 'osx', 'ubuntu', 'webos', 'windows']
    if (!argv.target) {
      warn(`Please also specify a target (-T <${targets.join('|')}>)`)
      warn()
      process.exit(1)
    }
    if (!targets.includes(argv.target)) {
      warn(`Unknown target "${ argv.target }" for Cordova`)
      warn()
      process.exit(1)
    }
  }

  if (cmd === 'build' && argv.mode === 'electron') {
    if (![undefined, 'all', 'darwin', 'win32', 'linux', 'mas'].includes(argv.target)) {
      warn(`Unknown target "${ argv.target }" for Electron`)
      warn()
      process.exit(1)
    }
    if (![undefined, 'ia32', 'x64', 'armv7l', 'arm64', 'mips64el', 'all'].includes(argv.arch)) {
      warn(`Unknown architecture "${ argv.arch }" for Electron`)
      warn()
      process.exit(1)
    }
  }
}
