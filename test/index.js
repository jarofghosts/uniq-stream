var stream = require('stream')

var test = require('tape')

var uniq = require('../')

test('opts.global dedupes globally', function(t) {
  var rs = stream.Readable()
    , ws = stream.Writable()
    , data = []

  t.plan(1)

  rs._read = function() {
    rs.push('hey')
    rs.push('woo')
    rs.push('hey')
    rs.push('there')
    rs.push('wee')
    rs.push('hey')
    rs.push(null)
  }

  ws._write = function(chunk, enc, next) {
    data.push('' + chunk)
    next()
  }

  ws.on('finish', function() {
    t.deepEqual(['hey', 'woo', 'there', 'wee'], data)
  })

  rs.pipe(uniq({global: true})).pipe(ws)
})

test('opts.ignoreCase ignores case', function(t) {
  var rs = stream.Readable()
    , ws = stream.Writable()
    , data = []

  t.plan(1)

  rs._read = function() {
    rs.push('hey')
    rs.push('HEY')
    rs.push('woo')
    rs.push('there')
    rs.push('THeRe')
    rs.push('WEE')
    rs.push('wee')
    rs.push(null)
  }

  ws._write = function(chunk, enc, next) {
    data.push('' + chunk)
    next()
  }

  ws.on('finish', function() {
    t.deepEqual(['hey', 'woo', 'there', 'WEE'], data)
  })

  rs.pipe(uniq({ignoreCase: true})).pipe(ws)
})

test('defaults dedupe linewise', function(t) {
  var rs = stream.Readable()
    , ws = stream.Writable()
    , data = []

  t.plan(1)

  rs._read = function() {
    rs.push('hey')
    rs.push('hey')
    rs.push('hey')
    rs.push('hey')
    rs.push('woo')
    rs.push('there')
    rs.push('wee')
    rs.push('hey')
    rs.push(null)
  }

  ws._write = function(chunk, enc, next) {
    data.push('' + chunk)
    next()
  }
  ws.on('finish', function() {
    t.deepEqual(['hey', 'woo', 'there', 'wee', 'hey'], data)
  })

  rs.pipe(uniq()).pipe(ws)
})

test('opts.inverse only streams duplicates', function(t) {
  var rs = stream.Readable()
    , ws = stream.Writable()
    , data = []

  t.plan(1)

  rs._read = function() {
    rs.push('hey')
    rs.push('hey')
    rs.push('there')
    rs.push('wee')
    rs.push('woo')
    rs.push('woo')
    rs.push(null)
  }

  ws._write = function(chunk, enc, next) {
    data.push('' + chunk)
    next()
  }
  ws.on('finish', function() {
    t.deepEqual(['hey', 'woo'], data)
  })

  rs.pipe(uniq({inverse: true})).pipe(ws)
})

test('opts.skip skips characters for matching', function(t) {
  var rs = stream.Readable()
    , ws = stream.Writable()
    , data = []

  t.plan(1)

  rs._read = function() {
    rs.push('hey')
    rs.push('hey')
    rs.push('pey')
    rs.push('woo')
    rs.push('too')
    rs.push('there')
    rs.push('where')
    rs.push('wee')
    rs.push('see')
    rs.push(null)
  }

  ws._write = function(chunk, enc, next) {
    data.push(chunk.toString())
    next()
  }
  ws.on('finish', function() {
    t.deepEqual(['hey', 'woo', 'there', 'wee'], data)
  })

  rs.pipe(uniq({skip: 1})).pipe(ws)
})
