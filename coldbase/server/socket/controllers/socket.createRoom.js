const validateCreateRoom = require("../validators/validate.createRoom")
const ripemd160 = require("crypto-js/ripemd160")

function createRoomController(data, roomsManager, socket) {
    validateCreateRoom(data, roomsManager.rooms)
        .then(data => {
            const { username, timestamp, socket_id } = data
            const keyRoom = ripemd160(username + timestamp + socket_id).toString()
            roomsManager.addRoom({ keyRoom: keyRoom, users: [{ username: username, socket_id: socket_id }], leader: socket_id })

            socket.join(keyRoom)
            socket.emit("createRoom", { status: "success", keyRoom: keyRoom, users: [{ username: username, socket_id: socket_id }] })
        })
        .catch(err => socket.emit("createRoom", err))
}

module.exports = createRoomController