'use strict'
var tape = require('tape')
var XorShift = require('../lib/xorshift')

tape.test('XorShift', function (t) {
  var xorshift = new XorShift()

  t.test('_hex2seed', function (t) {
    t.test('size is 4 and hex is 0102030405060708', function (t) {
      t.same(xorshift._hex2seed(4, '0102030405060708'), [ 16909060, 84281096, 0, 0 ])
      t.end()
    })

    t.test('size is 4 and hex is 02030405060708', function (t) {
      t.same(xorshift._hex2seed(4, '02030405060708'), [ 33752069, 395016, 0, 0 ])
      t.end()
    })

    t.test('size is 1 and hex is 02030405060708', function (t) {
      t.same(xorshift._hex2seed(1, '02030405060708'), [ 33752069 ])
      t.end()
    })

    t.end()
  })

  t.test('randomInt64 throw Error', function (t) {
    t.throws(function () {
      xorshift.randomInt64()
    }, 'Not implemented!')
    t.end()
  })

  t.test('random', function (t) {
    t.test('should use randomInt64', function (t) {
      t.plan(2)
      xorshift.randomInt64 = function () {
        t.pass()
        return [0, 0x00000f00]
      }
      t.equal(xorshift.random(), Math.pow(2, -53))
      t.end()
    })

    t.test('should drop first 11 bits', function (t) {
      t.plan(3)
      xorshift.randomInt64 = function () {
        t.pass()
        return [ 0xffffffff, 0xffffffff ]
      }
      var buffer = new Buffer(8)
      buffer.writeDoubleBE(xorshift.random(), 0)
      t.equal(buffer.readUInt32BE(0), 0x3fefffff)
      t.equal(buffer.readUInt32BE(4), 0xffffffff)
      t.end()
    })

    t.end()
  })

  t.test('randomBytes', function (t) {
    t.test('size equal 7', function (t) {
      t.plan(2)
      xorshift.randomInt64 = function () {
        t.pass()
        return [ 0xffffffff, 0xffffffff ]
      }
      t.same(xorshift.randomBytes(7).toString('hex'), 'ffffffffffffff')
      t.end()
    })

    t.end()
  })

  t.end()
})
