'use strict'
var tape = require('tape')
var XorShift = require('../lib/xorshift')
var XorShift1024Star = require('../lib/xorshift1024star')

var fixtures = require('./fixtures')

tape.test('XorShift1024Star', function (t) {
  t.test('initialization', function (t) {
    t.test('seed is undefined', function (t) {
      t.throws(function () {
        new XorShift1024Star() // eslint-disable-line no-new
      }, new TypeError('expected seed as array or hex string'))
      t.end()
    })

    t.test('seed hex string', function (t) {
      var xorshift = new XorShift1024Star('010203040506')
      t.same(xorshift._s[0], { H: 16909060, L: 1286 })
      for (var i = 1; i < 16; ++i) {
        t.same(xorshift._s[i], { H: 0, L: 0 })
      }
      t.equal(xorshift._p, 0)
      t.end()
    })

    t.test('bad array length', function (t) {
      t.throws(function () {
        new XorShift1024Star([1, 2, 0]) // eslint-disable-line no-new
      }, new TypeError('seed length should equal 32'))
      t.end()
    })

    t.end()
  })

  t.test('inherit XorShift', function (t) {
    var xorshift = new XorShift1024Star(new Array(32))
    t.ok(xorshift instanceof XorShift)
    t.ok(xorshift instanceof XorShift1024Star)
    t.end()
  })

  t.test('randomInt64', function (t) {
    function test (seed, p, count) {
      t.test('with seed: ' + JSON.stringify(seed), function (t) {
        var expected = fixtures.get('xorshift1024star', seed, p, count)

        var xorshift = new XorShift1024Star(seed, p)
        for (var i = 0; i < count; ++i) {
          var data = xorshift.randomInt64()
          t.equal(data[0], expected.readUInt32BE(i * 8))
          t.equal(data[1], expected.readUInt32BE(i * 8 + 4))
        }

        t.end()
      })
    }

    var seed = new Array(32)
    for (var i = 0; i < 32; ++i) {
      seed[i] = 1
    }

    for (var j = 0; j < 32; j += 8) {
      seed[j] = 1e3
      test(seed, 1, 1000)
    }

    t.end()
  })

  t.end()
})
