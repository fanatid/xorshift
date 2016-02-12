#xorshift.js

[![NPM Package](https://img.shields.io/npm/v/xorshift.js.svg?style=flat-square)](https://www.npmjs.org/package/xorshift.js)
[![Build Status](https://img.shields.io/travis/fanatid/xorshift.js.svg?branch=master&style=flat-square)](https://travis-ci.org/fanatid/xorshift.js)

> Pseudorandom number generator using [xorshift](http://xorshift.di.unimi.it/) (xorshift128+ and xorshift1024*)

This package is a fork of [xorshift](https://www.npmjs.com/package/xorshift) with fixed `random`, added `randomBytes` and `xorshift1024*`.

## Installation

```shell
npm install xorshift.js
```

## Example

```js
var xorshift = require('xorshift.js')

for (var i = 0; i < 10; i++) {
  console.log(xorshift.random()) // number in range [0, 1)
}
```

## API

This module exports a default PRNG created from `XorShift128Plus` with seed that have been set from `Date.now` and `Math.random`.

#### XorShift128Plus(seed)

Construct xorshift128+ with specific seed.

```js
var XorShift128Plus = require('xorshift.js').XorShift128Plus
var prng1 = new XorShift128Plus([1, 0, 2, 0])
var prng2 = new XorShift128Plus('000000010000000000000002')

assert(prng1.random() === prng2.random())
```

#### XorShift1024Star(seed, p)

Construct xorshift1024* with specific seed (longer period, but slower).

```js
var XorShift128Plus = require('xorshift.js').XorShift128Plus
var seed = [ 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3,
             0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3]
var prng1 = new XorShift1024Star(seed, 1)
var prng2 = new XorShift1024Star(seed, 1)

assert(prng1.random() === prng2.random())
```

#### randomInt64()

This method returns a random 64-bit integer represented as array with two 32-bit numbers.

```js
var xorshift = require('xorshift.js')
console.log(xorshift.randomInt64()) // [ 963369356, 63457019 ]
```

#### random()

This method returns a floating-point, pseudo-random number in the range [0, 1). Like `Math.ramdom`.

```js
var xorshift = require('xorshift.js')
console.log(xorshift.random()) // 0.3946640888604528
```

#### randomBytes(size)

Generates pseudo-random data. The size argument is a number indicating the number of bytes to generate.

```js
var xorshift = require('xorshift')
var buffer = xorshift.randomBytes(10)
console.log(buffer.toString('hex')) // 6fc7135516658ef9ce48
```

## License

MIT
