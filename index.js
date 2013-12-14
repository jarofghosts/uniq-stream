var through = require('through')

module.exports = uniq

function uniq(options) {
  var seen = [],
      output = []

  options = options || {}
  options.skip = options.skip || 0

  return through(dedupe)

  function dedupe(chunk) {
    var str = chunk.toString(),
        compare = str.slice(options.skip)

    if (options.ignoreCase) compare = compare.toLowerCase()
    if (seen.indexOf(compare) > -1) {
      if (!options.inverse || output.indexOf(compare) > -1) return
      output.push(compare)
      this.queue(str)
    }
    options.global ? seen.push(compare) : seen = [compare]
    if (!options.inverse) this.queue(str)
  }
}
