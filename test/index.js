const tape = require('tape')
const xorshift = require('../')
const XorShift = require('../lib/xorshift')
const XorShift128Plus = require('../lib/xorshift128plus')
const XorShift1024Star = require('../lib/xorshift1024star')

tape.test('index', (t) => {
  t.test('instance of XorShift', (t) => {
    t.ok(xorshift instanceof XorShift)
    t.end()
  })

  t.test('has XorShift', (t) => {
    t.ok(xorshift.XorShift === XorShift)
    t.end()
  })

  t.test('has XorShift128Plus', (t) => {
    t.ok(xorshift.XorShift128Plus === XorShift128Plus)
    t.end()
  })

  t.test('has XorShift1024Star', (t) => {
    t.ok(xorshift.XorShift1024Star === XorShift1024Star)
    t.end()
  })

  t.end()
})
