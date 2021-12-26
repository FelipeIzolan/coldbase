const RoomsManager = require("./RoomsManager")
const createRoomController = require("./controllers/socket.createRoom")

const rooms = new RoomsManager()
class ChatManager {
    constructor(socket, io) {
        this.socket = socket
        this.io = io
        this.rooms = rooms

        socket.on("createRoom", data => createRoomController(data, rooms))
    }
}

module.exports = ChatManager