'use strict'
var tape = require('tape')
var XorShift = require('../lib/xorshift')
var XorShift128Plus = require('../lib/xorshift128plus')

var fixtures = require('./fixtures')

tape.test('XorShift128Plus', function (t) {
  t.test('initialization', function (t) {
    t.test('seed is undefined', function (t) {
      t.throws(function () {
        new XorShift128Plus() // eslint-disable-line no-new
      }, new TypeError('expected seed as array or hex string'))
      t.end()
    })

    t.test('seed hex string', function (t) {
      var xorshift = new XorShift128Plus('010203040506')
      t.equal(xorshift._s0H, 16909060)
      t.equal(xorshift._s0L, 1286)
      t.equal(xorshift._s1H, 0)
      t.equal(xorshift._s1L, 0)
      t.end()
    })

    t.test('bad array length', function (t) {
      t.throws(function () {
        new XorShift128Plus([1, 2, 0]) // eslint-disable-line no-new
      }, new TypeError('seed length should equal 4'))
      t.end()
    })

    t.end()
  })

  t.test('inherit XorShift', function (t) {
    var xorshift = new XorShift128Plus(new Array(4))
    t.ok(xorshift instanceof XorShift)
    t.ok(xorshift instanceof XorShift128Plus)
    t.end()
  })

  t.test('randomInt64', function (t) {
    function test (seed, count) {
      t.test('with seed: ' + JSON.stringify(seed), function (t) {
        var expected = fixtures.get('xorshift128plus', seed, null, count)

        var xorshift = new XorShift128Plus(seed)
        for (var i = 0; i < count; ++i) {
          var data = xorshift.randomInt64()
          t.equal(data[0], expected.readUInt32BE(i * 8))
          t.equal(data[1], expected.readUInt32BE(i * 8 + 4))
        }

        t.end()
      })
    }

    test([1e3, 1, 1, 1], 1000)
    test([1, 1e3, 1, 1], 1000)
    test([1, 1, 1e3, 1], 1000)
    test([1, 1, 1, 1e3], 1000)

    t.end()
  })

  t.end()
})
