# uniq-stream

[![Build Status](https://img.shields.io/travis/jarofghosts/uniq-stream.svg?style=flat-square)](https://travis-ci.org/jarofghosts/uniq-stream)
[![npm install](https://img.shields.io/npm/dm/uniq-stream.svg?style=flat-square)](https://www.npmjs.org/package/uniq-stream)
[![npm version](https://img.shields.io/npm/v/uniq-stream.svg?style=flat-square)](https://www.npmjs.org/package/uniq-stream)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/feross/standard)
[![License](https://img.shields.io/npm/l/uniq-stream.svg?style=flat-square)](https://github.com/jarofghosts/uniq-stream/blob/master/LICENSE)

a stream that acts like [`uniq`](http://ss64.com/bash/uniq.html)

## Installation

```
npm install uniq-stream
```

## Usage

pipe it data and it pipes out de-duped (by line) data

#### Example

```javascript
var uniq = require('uniq-stream')
var split = require('split')
var fs = require('fs')

fs.createReadStream('dupe-ridden-file.txt')
  .pipe(split())
  .pipe(uniq())
  .pipe(fs.createWriteStream('clean-file.txt'))
```

## Options

uniq-stream accepts an options object as a first parameter, the acceptable
options are outlined below along with their defaults.

```javascript
{
  global: false, // de-dupe data globally rather than line-wise
  ignoreCase: false, // case insensitive comparison
  skip: 0, // ignore first (value) characters of input string for comparison
  inverse: false // only emit duplicated lines
}
```

## License

MIT
