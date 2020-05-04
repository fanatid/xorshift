const tape = require('tape')
const XorShift = require('../lib/xorshift')

tape.test('XorShift', (t) => {
  const xorshift = new XorShift()

  t.test('_hex2seed', (t) => {
    t.test('size is 4 and hex is 0102030405060708', (t) => {
      t.same(xorshift._hex2seed(4, '0102030405060708'), [16909060, 84281096, 0, 0])
      t.end()
    })

    t.test('size is 4 and hex is 02030405060708', (t) => {
      t.same(xorshift._hex2seed(4, '02030405060708'), [33752069, 395016, 0, 0])
      t.end()
    })

    t.test('size is 1 and hex is 02030405060708', (t) => {
      t.same(xorshift._hex2seed(1, '02030405060708'), [33752069])
      t.end()
    })

    t.end()
  })

  t.test('randomInt64 throw Error', (t) => {
    t.throws(() => {
      xorshift.randomInt64()
    }, 'Not implemented!')
    t.end()
  })

  t.test('random', (t) => {
    t.test('should use randomInt64', (t) => {
      t.plan(2)
      xorshift.randomInt64 = () => {
        t.pass()
        return [0, 0x00000f00]
      }
      t.equal(xorshift.random(), Math.pow(2, -53))
      t.end()
    })

    t.test('should drop first 11 bits', (t) => {
      t.plan(3)
      xorshift.randomInt64 = () => {
        t.pass()
        return [0xffffffff, 0xffffffff]
      }
      const buffer = Buffer.allocUnsafe(8)
      buffer.writeDoubleBE(xorshift.random(), 0)
      t.equal(buffer.readUInt32BE(0), 0x3fefffff)
      t.equal(buffer.readUInt32BE(4), 0xffffffff)
      t.end()
    })

    t.end()
  })

  t.test('randomBytes', (t) => {
    t.test('size equal 7', (t) => {
      t.plan(2)
      xorshift.randomInt64 = () => {
        t.pass()
        return [0xffffffff, 0xffffffff]
      }
      t.same(xorshift.randomBytes(7).toString('hex'), 'ffffffffffffff')
      t.end()
    })

    t.end()
  })

  t.end()
})
