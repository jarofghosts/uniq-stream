var through = require('through2')

module.exports = uniq

function uniq (_options) {
  var output = []
  var seen = []
  var options = _options || {}

  options.skip = options.skip || 0

  return through(dedupe)

  function dedupe (chunk, _, next) {
    var str = chunk.toString().slice(options.skip)

    if (options.ignoreCase) {
      str = str.toLowerCase()
    }

    if (seen.indexOf(str) > -1) {
      if (!options.inverse || output.indexOf(str) > -1) {
        return next()
      }

      output.push(str)

      this.push(chunk)
    }

    if (options.global) {
      seen.push(str)
    } else {
      seen = [str]
    }

    if (!options.inverse) {
      this.push(chunk)
    }

    next()
  }
}
