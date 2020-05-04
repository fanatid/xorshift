const XorShift = require('./xorshift')

module.exports = class XorShift128Plus extends XorShift {
  constructor (seed) {
    super()

    if (!seed) throw new TypeError('expected seed as array or hex string')
    if (typeof seed === 'string') seed = this._hex2seed(4, seed)
    if (seed.length !== 4) throw new TypeError('seed length should equal 4')

    this._s0H = seed[0] >>> 0
    this._s0L = seed[1] >>> 0
    this._s1H = seed[2] >>> 0
    this._s1L = seed[3] >>> 0
  }

  randomInt64 () {
    // uint64_t s1 = s[0];
    let s1H = this._s0H
    let s1L = this._s0L
    // const uint64_t s0 = s[1];
    const s0H = this._s1H
    const s0L = this._s1L
    // s[0] = s0;
    this._s0H = s0H
    this._s0L = s0L
    // s1 ^= s1 << 23;
    s1H ^= ((s1H & 0x000001ff) << 23) | (s1L >>> 9)
    s1L ^= (s1L & 0x000001ff) << 23
    // s[1] = s1 ^ s0 ^ (s1 >> 17) ^ (s0 >> 26);
    this._s1H ^= s1H ^ (s1H >>> 17) ^ (s0H >>> 26)
    this._s1H >>>= 0
    this._s1L ^= s1L ^ (((s1H & 0x0001ffff) << 15) | (s1L >>> 17)) ^ (((s0H & 0x03ffffff) << 6) | (s0L >>> 26))
    this._s1L >>>= 0
    // return s[1] + s0;
    const t = this._s1L + s0L
    return [
      (((t / 0x0100000000) | 0) + this._s1H + s0H) >>> 0,
      t >>> 0
    ]
  }
}
