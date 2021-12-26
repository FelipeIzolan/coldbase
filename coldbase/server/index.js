const express = require("express")
const { Server } = require("socket.io")
const ChatManager = require("./ChatManager")

const app = express()
const server = app.listen(5000)
const io = new Server(server, { cors: { origin: "http://localhost:3000" } })

io.on("connection", socket => new ChatManager(socket, io))