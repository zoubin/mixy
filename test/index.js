var test = require('tap').test
var mixy = require('..')

test('mix', function (t) {
  var o = {}
  var mix = mixy.mix

  t.equal(mix(o, { a: 1 }), o, 'return the receiver')
  t.same(mix({}, { a: 1 }, { b: 2 }), { a: 1, b: 2 }, 'mix keys')
  t.same(mix({ a: 1, c: 3 }, { a: 2, b: 2 }), { a: 2, b: 2, c: 3 }, 'overwrite')
  t.same(mix({ a: 1 }, null), { a: 1 }, 'null')
  t.same(mix({ a: 1 }, undefined), { a: 1 }, 'undefined')
  t.same(mix({ a: 1 }), { a: 1 }, 'no src')

  t.end()
})

test('del', function (t) {
  var del = mixy.del

  var o = { a: 1, b: 2, c: 3 }
  t.same(del([], o), null, 'no keys to delete')
  t.same(o, { a: 1, b: 2, c: 3 })

  t.same(del('d', o), null, 'delete nonexisting key')
  t.same(o, { a: 1, b: 2, c: 3 })

  o = { a: 1, b: 2, c: 3 }
  t.same(del('a', o), { a: 1 }, 'delete a single key')
  t.same(o, { b: 2, c: 3 })

  o = { a: 1, b: 2, c: 3 }
  t.same(del(['a', 'b'], o), { a: 1, b: 2 }, 'delete multiple keys')
  t.same(o, { c: 3 })

  o = { a: 1, b: 2, c: 3 }
  t.same(del(['b', 'd'], o), { b: 2 }, 'delete existing and nonexisting keys')
  t.same(o, { a: 1, c: 3 })

  t.end()
})

test('fill', function (t) {
  var fill = mixy.fill

  t.same(fill({ b: 2 }), { b: 2 }, 'no defaults')
  t.same(fill({ b: 2 }, null), { b: 2 }, 'null defaults')
  t.same(fill(null, { b: 2 }), null, 'null receiver')
  t.same(fill({ a: 1 }, { b: 2 }), { a: 1, b: 2 }, 'fill nonexisting properties')
  t.same(fill({ a: 1 }, { a: 2 }), { a: 1 }, 'fill existing properties')
  t.same(fill({ a: 1, c: 3 }, { a: 2, b: 2 }), { a: 1, b: 2, c: 3 }, 'fill both existing and nonexisting properties')

  t.end()
})

test('pick', function (t) {
  var pick = mixy.pick

  t.same(pick('a', { a: 1, b: 2 }), { a: 1 }, 'pick one key')
  t.same(pick('a'), {}, 'pick from undefined')
  t.same(pick('a', null), {}, 'pick from null')
  t.same(pick('c', { a: 1, b: 2 }), {}, 'pick nonexisting keys')
  t.same(pick(['a', 'b'], { a: 1, b: 2, c: 3 }), { a: 1, b: 2 }, 'pick multiple keys')
  t.same(pick(['a', 'd'], { a: 1, b: 2, c: 3 }), { a: 1 }, 'pick both existing and nonexisting keys')
  t.same(pick(['a', 'b'], { a: 1, b: 3 }, { a: 2, c: 3 }), { a: 2, b: 3 }, 'pick from multiple objects')

  t.end()
})

test('exlude', function(t) {
  var exclude = mixy.exclude

  t.same(exclude('x'), {}, 'exlude from undefined')
  t.same(exclude('x', null), {}, 'exlude from null')
  t.same(exclude('x', { x: 1, y: 2 }), { y: 2 }, 'exlude a single key')
  t.same(exclude(['x', 'y'], { x: 1, y: 2 }), {}, 'exlude multiple keys')
  t.same(exclude(['x', 'z'], { x: 1 }, { y: 2 }, { z: 3 }), { y: 2 }, 'exlude from multiple objects')

  t.end()
})

test('each', function(t) {
  var each = mixy.each

  var count = 0
  each(null, function () {
    ++count
  })
  t.equal(count, 0, 'each null')

  var keys = []
  var values = []
  each({ x: 1, y: 2 }, function (v, k) {
    keys.push(k)
    values.push(v)
  })
  t.same(keys, ['x', 'y'], 'each key')
  t.same(values, [1, 2], 'each value')

  var o = {}
  each({ x: 1, y: 2 }, function (v, k) {
    o[k] = this[k]
  })
  t.same(o, { x: 1, y: 2 }, 'default executing context')

  var ctx = { x: 1, y: 2 }
  o = {}
  each({ x: 3, y: 4 }, function (v, k) {
    o[k] = this[k]
  }, ctx)
  t.same(o, { x: 1, y: 2 }, 'custom executing context')

  t.end()
})

