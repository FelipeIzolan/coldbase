const cluster = require("cluster");
const { setupMaster } = require("@socket.io/sticky");
const { createRedisClient } = require("./src/redis.js");
const http = require("http");
const os = require("os");

async function main() {
  var CPUs = os.cpus().length
  var server = http.createServer()
  var redisPrimary = createRedisClient()

  await redisPrimary.connect()
  await redisPrimary.set("rooms", JSON.stringify([]))
  await redisPrimary.disconnect()
  console.log(`Process: ${process.pid} | Redis disconnected`)

  setupMaster(server, { loadBalancingMethod: "least-connection" })
  server.listen(5000)

  for (let i = 0; i < CPUs; i++) {
    cluster.fork()
  }

  cluster.on("fork", worker => console.log(`Process: ${worker.process.pid} | Worker connected`))
  cluster.on("exit", exitedWorker => {
    if (exitedWorker.exitedAfterDisconnect) {
      console.log(`Process: ${exitedWorker.process.pid} | Worker disconnected`)
    } else {
      let worker = cluster.fork()
      console.log(`Process: ${exitedWorker.process.pid} to ${worker.process.pid} | Worker reconnecting`)
    }
  })
}

function worker() {
  require("./src/server.js")();
}

cluster.isPrimary ? main() : worker()
