const rooms = require("../rooms.js")

async function createRoom(socket, username) {
  let room = await rooms.getById(socket.id)

  if (!room) {
    const key = await rooms.create(socket.id, username)
    socket.join(key)
    socket.emit("key-room", key)
  } else {
    socket.emit("error", "Instance already created.")
  }
 }

module.exports = createRoom
