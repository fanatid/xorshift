const path = require('path')
const spawnSync = require('child_process').spawnSync || require('spawn-sync')

exports.get = function get (algo, seed, p, count) {
  const args = [algo]

  const buffer = Buffer.allocUnsafe(8)
  for (let i = 0; i < seed.length; i += 2) {
    buffer.writeUInt32BE(seed[i], 0)
    buffer.writeUInt32BE(seed[i + 1], 4)
    args.push(buffer.toString('hex'))
  }

  if (p) args.push(p.toString(10))
  args.push(count.toString(10))

  const data = spawnSync(path.join(__dirname, 'xorshift'), args)
  if (data.error) throw data.error

  return Buffer.from(data.stdout.toString().slice(0, -1), 'hex') // cut \n
}
