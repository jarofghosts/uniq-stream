var through = require('through')

module.exports = uniq

function uniq(options) {
  var output = []
    , seen = []

  options = options || {}
  options.skip = options.skip || 0

  var dedupe_stream = through(dedupe)

  return dedupe_stream

  function dedupe(chunk) {
    var str = '' + chunk

    var compare = str.slice(options.skip)

    if(options.ignoreCase) compare = compare.toLowerCase()
    if(seen.indexOf(compare) > -1) {
      if(!options.inverse || output.indexOf(compare) > -1) return
      output.push(compare)

      dedupe_stream.queue(str)
    }

    options.global ? seen.push(compare) : seen = [compare]

    if(!options.inverse) dedupe_stream.queue(str)
  }
}
