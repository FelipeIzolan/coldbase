const validateDiscoonectRoom = require("../validators/validate.disconnectRoom")

function disconnectRoomController(data, roomsManager, socket, io) {
    validateDiscoonectRoom(data, roomsManager.rooms)
        .then(data => {
            const { username, socket_id, keyRoom } = data
            const room = roomsManager.getRoom(keyRoom)

            if (room.leader === socket_id) {
                roomsManager.removeRoom(socket_id)
                io.leave(keyRoom)
                socket.to(keyRoom).emit("disconnectRoom", { status: "success", leader: true })
                socket.emit("disconnectRoom", { status: "success" })
            } else {
                roomsManager.removeUserFromRoom(keyRoom, socket_id)
                socket.leave(keyRoom)
                io.to(keyRoom).emit("leaveUser", { username: username, socket_id: socket_id })
                socket.emit("disconnectRoom", { status: "success" })
            }
        })
        .catch(err => socket.emit("disconnectRoom", err))
}