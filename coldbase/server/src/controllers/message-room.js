const rooms = require("../rooms.js")

async function messageRoom(socket, username, message) {
  const room = await rooms.getById(socket.id)

  if (room) {
    socket.to(room.key).emit("message-room", {username: username, message: message, id: socket.id})
  } else {
    socket.emit("error", "No connection to an existing instance.")
  }
}

module.exports = messageRoom
