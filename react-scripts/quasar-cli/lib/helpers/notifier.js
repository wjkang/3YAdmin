const path = require('path')

const
  appPaths = require('../build/app-paths'),
  icon = path.join(appPaths.cliDir, 'assets/quasar-logo.png')

module.exports = function ({ title = 'Quasar App', message = '', subtitle = '', onClick }) {
  // require it only if necessary
  const
    notifier = require('node-notifier'),
    hasClick = typeof onClick === 'function'

  notifier.notify({
    title,
    message,
    subtitle,
    icon,
    timeout: hasClick ? 10 : undefined,
    actions: 'Close'
  }, (err, response, metadata) => {
    if (
      hasClick &&
      response === 'activate' &&
      metadata.activationValue !== 'Close'
    ) {
      onClick()
    }
  })
}
