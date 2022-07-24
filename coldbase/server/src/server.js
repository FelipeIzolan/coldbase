const express = require("express");
const http = require("http");
const rooms = require("./rooms.js");
const { Server: SocketServer } = require("socket.io");
const { createAdapter } = require("@socket.io/redis-adapter");
const { setupWorker } = require("@socket.io/sticky");
const { createRedisClient, duplicateRedisClient } = require("./redis.js");

async function Server() {
  const app = express()
  const server = http.createServer(app)

  const io = new SocketServer(server, { cors: { origin: "http://localhost:3000" } })
  const redisPrimary = createRedisClient()
  const redisSecondary = duplicateRedisClient(redisPrimary)

  await redisPrimary.connect()
  await redisSecondary.connect()
  await rooms.redisClient(redisPrimary)

  io.adapter(createAdapter(redisPrimary, redisSecondary))
  setupWorker(io)

  io.on("connection", socket => {
    socket.on("disconnect", () => require("./controllers/disconnect.js")(socket, io))
    socket.on("create-room", ({ username }) => require("./controllers/create-room.js")(socket, username))
    socket.on("join-room", ({ username, key }) => require("./controllers/join-room.js")(socket, username, key))
    socket.on("message-room", ({username, message}) => require("./controllers/message-room.js")(socket, username, message))
  })

  // http
  /*
    app.get("/", (req, res) => res.send("Hello, World!"))
  */
}

module.exports = Server
