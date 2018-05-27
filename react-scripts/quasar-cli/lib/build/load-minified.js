const
  fs = require('fs'),
  UglifyJS = require('uglify-es')

module.exports = function (filePath) {
  const
    code = fs.readFileSync(filePath, 'utf-8'),
    result = UglifyJS.minify(code)

  if (result.error) {
    return ''
  }

  return result.code
}
