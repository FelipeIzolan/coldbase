const { createClient } = require("redis");

function createRedisClient() {
  var redisClient = createClient()

  redisClient.on("connect", () => console.log(`Process: ${process.pid} | Redis connected`))
  redisClient.on("error", err => console.log(`Process: ${process.pid} | Redis error | ${err}`))

  return redisClient
}

function duplicateRedisClient(client) {
  var redisClient = client.duplicate()

  redisClient.on("connect", () => console.log(`Process: ${process.pid} | Redis connected | duplicate`))
  redisClient.on("error", err => console.log(`Process: ${process.pid} | Redis error | duplicate | ${err}`))

  return redisClient
}

module.exports = {
  createRedisClient,
  duplicateRedisClient
}
