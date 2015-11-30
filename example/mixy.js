var mixy = require('..')

console.log('=== mix ===')
var o = { x: 1 }
mixy.mix(o, { x: 2 }, null, { y: 3 }, { x: 4 })
console.log(o)

console.log('=== fill ===')
var o = { x: 1, y: 2, z: null, w: undefined }
mixy.fill(o, { x: 2, z: 3, w: 4, a: null, b: undefined })
console.log(o)

console.log('=== pick ===')
console.log(
  mixy.pick(['x', 'y'], { x: 1, y: 2 }, null, { x: 3 })
)
console.log(
  mixy.pick('x', { x: 1, y: 2 }, { x: 3 })
)

console.log('=== exclude ===')
console.log(
  mixy.exclude('y', { x: 1, y: 2 }, null, { x: 3 })
)
console.log(
  mixy.exclude(['x', 'y'], { x: 1, y: 2, z: 3 }, { x: 3, z: 4 })
)

console.log('=== del ===')
console.log(
  mixy.del('y', { x: 1, y: 2 })
)
console.log(
  mixy.del('z', { x: 1, y: 2 })
)
console.log(
  mixy.del(['x', 'y'], { x: 1, y: 2, z: 3 })
)

