const validateUserTakePrint = require("../validators/validate.userTakePrint")

function userTakePrintController(data, roomsManager, socket) {
    validateUserTakePrint(data, roomsManager.rooms)
        .then(data => {
            const { username, socket_id, keyRoom } = data
            socket.to(keyRoom).emit("userTakePrint", { status: "success", username: username, socket_id: socket_id })
            socket.emit("userTakePrint", { status: "success", username: username, socket_id: socket_id })
        })
        .catch(err => socket.emit("userTakePrint", err))
}

module.exports = userTakePrintController