const rooms = require("../rooms.js")

async function disconnect(socket, io) {
  const room = await rooms.getById(socket.id)
  const user = room ? room.users.find(user => user.id === socket.id) : null 

  if (room && room.leaderId === socket.id) {
    await rooms.remove(socket.id)
    io.to(room.key).emit("leader-disconnect")
    io.in(room.key).socketsLeave(room.key)
  } else if (room && room.leaderId !== socket.id) {
    await rooms.leave(socket.id, room.key)
    io.to(room.key).emit("user-disconnect", { username: user.username, id: user.id })
  }
}

module.exports = disconnect
