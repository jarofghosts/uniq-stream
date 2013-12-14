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
  rs.push('see')
  rs.push('pey')
  rs.push('where')
  rs.push('too')
  rs.push('hey')
  rs.push(null)
}

ws._write = function(chunk, enc, next) {
  data.push(chunk.toString())
  next()
}
ws.on('finish', function() {
  assert.deepEqual(['hey', 'woo', 'there', 'wee'], data)
})

rs.pipe(uniq({ global: true, skip: 1 })).pipe(ws)
