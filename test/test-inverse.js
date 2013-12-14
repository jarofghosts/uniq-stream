var uniq = require('../'),
    stream = require('stream'),
    assert = require('assert'),
    rs = stream.Readable(),
    ws = stream.Writable(),
    data = []

rs._read = function() {
  rs.push('hey')
  rs.push('woo')
  rs.push('hey')
  rs.push('there')
  rs.push('wee')
  rs.push('woo')
  rs.push('hey')
  rs.push(null)
}

ws._write = function(chunk, enc, next) {
  data.push(chunk.toString())
  next()
}
ws.on('finish', function() {
  assert.deepEqual(['hey', 'woo'], data)
})

rs.pipe(uniq({ global: true, inverse: true })).pipe(ws)
