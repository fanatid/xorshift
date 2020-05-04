const tape = require('tape')
const XorShift = require('../lib/xorshift')
const XorShift1024Star = require('../lib/xorshift1024star')

const fixtures = require('./fixtures')

tape.test('XorShift1024Star', (t) => {
  t.test('initialization', (t) => {
    t.test('seed is undefined', (t) => {
      t.throws(() => {
        new XorShift1024Star() // eslint-disable-line no-new
      }, new TypeError('expected seed as array or hex string'))
      t.end()
    })

    t.test('seed hex string', (t) => {
      const xorshift = new XorShift1024Star('010203040506')
      t.same(xorshift._s[0], { H: 16909060, L: 1286 })
      for (let i = 1; i < 16; ++i) {
        t.same(xorshift._s[i], { H: 0, L: 0 })
      }
      t.equal(xorshift._p, 0)
      t.end()
    })

    t.test('bad array length', (t) => {
      t.throws(() => {
        new XorShift1024Star([1, 2, 0]) // eslint-disable-line no-new
      }, new TypeError('seed length should equal 32'))
      t.end()
    })

    t.end()
  })

  t.test('inherit XorShift', (t) => {
    const xorshift = new XorShift1024Star(new Array(32))
    t.ok(xorshift instanceof XorShift)
    t.ok(xorshift instanceof XorShift1024Star)
    t.end()
  })

  t.test('randomInt64', (t) => {
    const test = (seed, p, count) => {
      t.test('with seed: ' + JSON.stringify(seed), (t) => {
        const expected = fixtures.get('xorshift1024star', seed, p, count)

        const xorshift = new XorShift1024Star(seed, p)
        for (let i = 0; i < count; ++i) {
          const data = xorshift.randomInt64()
          t.equal(data[0], expected.readUInt32BE(i * 8))
          t.equal(data[1], expected.readUInt32BE(i * 8 + 4))
        }

        t.end()
      })
    }

    const seed = new Array(32).fill(1)

    for (let j = 0; j < 32; j += 8) {
      seed[j] = 1e3
      test(seed, 1, 1000)
    }

    t.end()
  })

  t.end()
})
