const RoomsManager = require("./RoomsManager")
const createRoomController = require("./controllers/socket.createRoom")

const roomsManager = new RoomsManager()
class ChatManager {
    constructor(socket, io) {
        this.socket = socket
        this.io = io
        this.roomsManager = roomsManager

        socket.on("createRoom", data => createRoomController(data, roomsManager, socket))
    }
}

module.exports = ChatManager