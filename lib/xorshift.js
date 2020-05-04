module.exports = class XorShift {
  _hex2seed (size, hex) {
    const arr = new Array(size)
    for (let i = 0; i < size; ++i) {
      arr[i] = parseInt(hex.slice(i * 8, (i + 1) * 8), 16) >>> 0
    }
    return arr
  }

  randomInt64 (_enc) {
    throw new Error('Not implemented!')
  }

  random () {
    const x = this.randomInt64()
    return (x[0] * 0x00200000 + (x[1] >>> 11)) * Math.pow(2, -53)
  }

  randomBytes (size) {
    const bufSize = ((size >>> 3) << 3) + 8
    const buffer = Buffer.allocUnsafe(bufSize)
    for (let offset = 0; offset < size; offset += 8) {
      const x = this.randomInt64()
      buffer.writeUInt32BE(x[0], offset, true)
      buffer.writeUInt32BE(x[1], offset + 4, true)
    }
    return buffer.slice(0, size)
  }
}
