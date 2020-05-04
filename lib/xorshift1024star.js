const XorShift = require('./xorshift')

module.exports = class XorShift1024Star extends XorShift {
  constructor (seed, p) {
    super()

    if (!seed) throw new TypeError('expected seed as array or hex string')
    if (typeof seed === 'string') seed = this._hex2seed(32, seed)
    if (seed.length !== 32) throw new TypeError('seed length should equal 32')

    this._s = new Array(16)
    for (let i = 0; i < 16; ++i) {
      this._s[i] = { H: seed[i * 2] >>> 0, L: seed[i * 2 + 1] >>> 0 }
    }

    this._p = p & 0x0f
  }

  randomInt64 () {
    const s = this._s
    let p = this._p
    // const uint64_t s0 = s[p];
    const s0H = s[p].H
    const s0L = s[p].L
    // uint64_t s1 = s[p = (p + 1) & 15];
    p = this._p = (p + 1) & 0x0f
    let s1H = s[p].H
    let s1L = s[p].L
    // s1 ^= s1 << 31;
    s1H ^= (((s1H & 0x00000001) << 31) | (s1L >>> 1))
    s1L ^= (s1L & 0x00000001) << 31
    // s[p] = s1 ^ s0 ^ (s1 >> 11) ^ (s0 >> 30);
    s[p].H = s1H ^ s0H ^ (s1H >>> 11) ^ (s0H >>> 30)
    s[p].H >>>= 0
    s[p].L = s1L ^ s0L ^ (((s1H & 0x000007ff) << 21) | (s1L >>> 11)) ^ (((s0H & 0x3fffffff) << 2) | (s0L >>> 30))
    s[p].L >>>= 0
    // return s[p] * HINT64_C(1181783497276652981); 0x106689d45497fdb5
    const w0 = s[p].L & 0x00ffffff
    const w1 = ((s[p].H & 0x0000ffff) << 8) | (s[p].L >>> 24)
    const w2 = s[p].H >>> 16
    const r0 = w0 * 0x97fdb5
    const r1 = ((r0 / 0x01000000) | 0) + w0 * 0x89d454 + w1 * 0x97fdb5
    const r2 = ((r1 / 0x01000000) | 0) + w0 * 0x1066 + w1 * 0x89d454 + w2 * 0x97fdb5
    return [
      ((r2 & 0x0000ffff) << 16 | ((r1 & 0x00ffff00) >>> 8)) >>> 0,
      (((r1 & 0x000000ff) << 24) | (r0 & 0x00ffffff)) >>> 0
    ]
  }
}
