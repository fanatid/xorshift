#xorshift.js

[![NPM Package](https://img.shields.io/npm/v/xorshift.js.svg?style=flat-square)](https://www.npmjs.org/package/xorshift.js)
[![Build Status](https://img.shields.io/travis/fanatid/xorshift.js.svg?branch=master&style=flat-square)](https://travis-ci.org/fanatid/xorshift.js)

> Pseudorandom number generator using [xorshift](http://xorshift.di.unimi.it/) (xorshift128+ and xorshift1024*)

This package is based on [xorshift](https://www.npmjs.com/package/xorshift) [[github](https://github.com/AndreasMadsen/xorshift)] with fixed `random` and added `randomBytes` & `XorShift1024Star`.

## Installation

```shell
npm install xorshift.js
```

## Example

```js
const xorshift = require('xorshift.js')

for (let i = 0; i < 10; i++) {
  console.log(xorshift.random()) // number in range [0, 1)
}
```

## API

This module exports a default PRNG created from `XorShift128Plus` with seed that have been set from `Date.now` and `Math.random`.

#### XorShift128Plus(seed)

Construct xorshift128+ with specific seed.

```js
const { XorShift128Plus } = require('xorshift.js')
const prng1 = new XorShift128Plus([1, 0, 2, 0])
const prng2 = new XorShift128Plus('000000010000000000000002')

assert(prng1.random() === prng2.random())
```

#### XorShift1024Star(seed, p)

Construct xorshift1024* with specific seed (longer period, but slower).

```js
const { XorShift128Plus } = require('xorshift.js')
const seed = [0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3]
const prng1 = new XorShift1024Star(seed, 1)
const prng2 = new XorShift1024Star(seed, 1)

assert(prng1.random() === prng2.random())
```

#### randomInt64()

This method returns a random 64-bit integer represented as array with two 32-bit numbers.

```js
const { XorShift128Plus } = require('xorshift.js')
const prng = new XorShift128Plus([1, 0, 2, 0])
console.log(prng.randomInt64()) // [8388677, 32896]
```

#### random()

This method returns a floating-point, pseudo-random number in the range [0, 1). Like `Math.ramdom`.

```js
const { XorShift128Plus } = require('xorshift.js')
const prng = new XorShift128Plus([1, 0, 2, 0])
console.log(prng.random()) // 0.0019531410653161885
```

#### randomBytes(size)

Generates pseudo-random data. The size argument is a number indicating the number of bytes to generate.

```js
const { XorShift128Plus } = require('xorshift.js')
const prng = new XorShift128Plus([1, 0, 2, 0])
console.log(prng.randomBytes(10).toString('hex')) // 00800045000080800200
```

## License

MIT
