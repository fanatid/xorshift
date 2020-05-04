const benchmark = require('benchmark')
const xorshift = require('../')

benchmark.options.minTime = 1

const seed = new Array(32)
for (let i = 0; i < seed.length; ++i) seed[i] = (Math.random() * 100) | 0

const getBenchmarkFunction = (rng) => () => rng.random()

new benchmark.Suite({
  onStart: () => console.log('--------------------------------------------------'),
  onCycle: (event) => console.log(String(event.target)),
  onComplete: () => console.log('==================================================')
})
  .add('xorshift128+', getBenchmarkFunction(new xorshift.XorShift128Plus(seed.slice(0, 4))))
  .add('xorshift1024*', getBenchmarkFunction(new xorshift.XorShift1024Star(seed, 1)))
  .run()
