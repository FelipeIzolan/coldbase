const validateNewMessage = require("../validators/validate.newMessage")

function newMessageController(data, roomsManager, socket) {
    validateNewMessage(data, roomsManager.rooms)
        .then(data => {
            const { username, socket_id, message, keyRoom } = data
            socket.to(keyRoom).emit("newMessage", { username: username, socket_id: socket_id, message: message })
        })
        .catch(err => socket.emit("newMessage", err))
}

module.exports = newMessageController