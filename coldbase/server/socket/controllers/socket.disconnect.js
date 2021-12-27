function disconnectController(socket_id, roomsManager, io) {
    const room = roomsManager.rooms.find(room => room.users.some(user => user.socket_id === socket_id)) ||
                 roomsManager.rooms.find(room => room.leader === socket_id)
    if (!room) return

    if (room.leader === socket_id) {
        roomsManager.removeRoom(socket_id)
        io.to(room.keyRoom).emit("disconnectRoom", { status: "success", leader: true })
    } else {
        const user = room.users.find(user => user.socket_id === socket_id)
        roomsManager.removeUserFromRoom(room.keyRoom, socket_id)
        io.to(room.keyRoom).emit("leaveUser", { username: user.username, socket_id: socket_id })
    }
}

module.exports = disconnectController