const rooms = require("../rooms.js")

async function joinRoom(socket, username, key) {
  const room = await rooms.getById(socket.id)

  if (!room) {
    const isConnected = await rooms.join(socket.id, username, key)

    if (isConnected) {
      socket.join(key)
      socket.emit("key-room", key)
      socket.to(key).emit("user-connect", { username: username, id: socket.id })
    } else {
      socket.emit("error", "Invalid key.")
    }
  } else {
    socket.emit("error", "Instance already connected.")
  }
}

module.exports = joinRoom
