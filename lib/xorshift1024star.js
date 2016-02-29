'use strict'
var inherits = require('inherits')
var XorShift = require('./xorshift')

function XorShift1024Star (seed, p) {
  XorShift.call(this)

  if (!seed) throw new TypeError('expected seed as array or hex string')
  if (typeof seed === 'string') seed = this._hex2seed(32, seed)
  if (seed.length !== 32) throw new TypeError('seed length should equal 32')

  this._s = new Array(16)
  for (var i = 0; i < 16; ++i) {
    this._s[i] = { H: seed[i * 2] >>> 0, L: seed[i * 2 + 1] >>> 0 }
  }

  this._p = p & 0x0f
}

inherits(XorShift1024Star, XorShift)

XorShift1024Star.prototype.randomInt64 = function () {
  var s = this._s
  var p = this._p
  // const uint64_t s0 = s[p];
  var s0H = s[p].H
  var s0L = s[p].L
  // uint64_t s1 = s[p = (p + 1) & 15];
  p = this._p = (p + 1) & 0x0f
  var s1H = s[p].H
  var s1L = s[p].L
  // s1 ^= s1 << 31;
  s1H ^= (((s1H & 0x00000001) << 31) | (s1L >>> 1))
  s1L ^= (s1L & 0x00000001) << 31
  // s[p] = s1 ^ s0 ^ (s1 >> 11) ^ (s0 >> 30);
  s[p].H = s1H ^ s0H ^ (s1H >>> 11) ^ (s0H >>> 30)
  s[p].H >>>= 0
  s[p].L = s1L ^ s0L ^ (((s1H & 0x000007ff) << 21) | (s1L >>> 11)) ^ (((s0H & 0x3fffffff) << 2) | (s0L >>> 30))
  s[p].L >>>= 0
  // return s[p] * HINT64_C(1181783497276652981); 0x106689d45497fdb5
  var w0 = s[p].L & 0x00ffffff
  var w1 = ((s[p].H & 0x0000ffff) << 8) | (s[p].L >>> 24)
  var w2 = s[p].H >>> 16
  var r0 = w0 * 0x97fdb5
  var r1 = ((r0 / 0x01000000) | 0) + w0 * 0x89d454 + w1 * 0x97fdb5
  var r2 = ((r1 / 0x01000000) | 0) + w0 * 0x1066 + w1 * 0x89d454 + w2 * 0x97fdb5
  return [
    ((r2 & 0x0000ffff) << 16 | ((r1 & 0x00ffff00) >>> 8)) >>> 0,
    (((r1 & 0x000000ff) << 24) | (r0 & 0x00ffffff)) >>> 0
  ]
}

module.exports = XorShift1024Star
