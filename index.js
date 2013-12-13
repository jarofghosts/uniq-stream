var through = require('through')

module.exports = uniq

function uniq() {
  var seen = []

  return through(dedupe)

  function dedupe(chunk) {
    var str = chunk.toString()

    if (seen.indexOf(str) > -1) return
    seen.push(str)
    this.queue(str)
  }
}
