const validateJoinRoom = require("../validators/validate.joinRoom")

function joinRoomController(data, roomsManager, socket) {
    validateJoinRoom(data, roomsManager.rooms)
        .then(data => {
            const { username, socket_id, keyRoom } = data
            roomsManager.addUserInRoom(keyRoom, { username: username, socket_id: socket_id })

            socket.join(keyRoom)
            socket.to(keyRoom).emit("newUser", { username: username, socket_id: socket_id })
            socket.emit("joinRoom", { keyRoom: keyRoom, users: roomsManager.getRoom(keyRoom).users })
        })
        .catch(err => socket.emit("joinRoom", err))
}

module.exports = joinRoomController