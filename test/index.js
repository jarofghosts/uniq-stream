var test = require('tape')

var uniq = require('../')

test('opts.global dedupes globally', function(t) {
  var uniqStream = uniq({global: true})
    , data = []

  t.plan(1)

  uniqStream.on('data', data.push.bind(data))

  uniqStream.on('end', function() {
    t.deepEqual(['woo', 'hey', 'there', 'wee'].map(toBuffer), data)
    t.end()
  })

  uniqStream.write('woo')
  uniqStream.write('hey')
  uniqStream.write('there')
  uniqStream.write('wee')
  uniqStream.write('hey')

  uniqStream.end()
})

test('opts.ignoreCase ignores case', function(t) {
  var uniqStream = uniq({ignoreCase: true})
    , data = []

  t.plan(1)

  uniqStream.on('data', data.push.bind(data))

  uniqStream.on('end', function() {
    t.deepEqual(['hey', 'woo', 'there', 'WEE'].map(toBuffer), data)
    t.end()
  })

  uniqStream.write('hey')
  uniqStream.write('HEY')
  uniqStream.write('woo')
  uniqStream.write('there')
  uniqStream.write('THeRe')
  uniqStream.write('WEE')
  uniqStream.write('wee')

  uniqStream.end()
})

test('defaults dedupe linewise', function(t) {
  var uniqStream = uniq()
    , data = []

  t.plan(1)

  uniqStream.on('data', data.push.bind(data))

  uniqStream.on('end', function() {
    t.deepEqual(['hey', 'woo', 'there', 'wee', 'hey'].map(toBuffer), data)
    t.end()
  })

  uniqStream.write('hey')
  uniqStream.write('hey')
  uniqStream.write('hey')
  uniqStream.write('hey')
  uniqStream.write('woo')
  uniqStream.write('there')
  uniqStream.write('wee')
  uniqStream.write('hey')

  uniqStream.end()
})

test('opts.inverse only streams duplicates', function(t) {
  var uniqStream = uniq({inverse: true})
    , data = []

  t.plan(1)

  uniqStream.on('data', data.push.bind(data))

  uniqStream.on('end', function() {
    t.deepEqual(['hey', 'woo'].map(toBuffer), data)
    t.end()
  })

  uniqStream.write('hey')
  uniqStream.write('hey')
  uniqStream.write('there')
  uniqStream.write('wee')
  uniqStream.write('woo')
  uniqStream.write('woo')

  uniqStream.end()
})

test('opts.skip skips characters for matching', function(t) {
  var uniqStream = uniq({skip: 1})
    , data = []

  t.plan(1)

  uniqStream.on('data', data.push.bind(data))

  uniqStream.on('end', function() {
    t.deepEqual(['hey', 'woo', 'there', 'wee'].map(toBuffer), data)
    t.end()
  })

  uniqStream.write('hey')
  uniqStream.write('hey')
  uniqStream.write('pey')
  uniqStream.write('woo')
  uniqStream.write('too')
  uniqStream.write('there')
  uniqStream.write('where')
  uniqStream.write('wee')
  uniqStream.write('see')

  uniqStream.end()
})

function toBuffer(str) {
  return new Buffer(str)
}
