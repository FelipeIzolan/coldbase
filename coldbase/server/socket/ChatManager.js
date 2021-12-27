const RoomsManager = require("./RoomsManager")
const createRoomController = require("./controllers/socket.createRoom")
const joinRoomController = require("./controllers/socket.joinRoom")
const newMessageController = require("./controllers/socket.newMessage")
const disconnectRoomController = require("./controllers/socket.disconnectRoom")
const disconnectController = require("./controllers/socket.disconnect")
const userTakePrintController = require("./controllers/socket.userTakePrint")

const roomsManager = new RoomsManager()
class ChatManager {
    constructor(socket, io) {
        this.socket = socket
        this.io = io
        this.roomsManager = roomsManager

        socket.on("createRoom", data => createRoomController(data, roomsManager, socket))
        socket.on("joinRoom", data => joinRoomController(data, roomsManager, socket))
        socket.on("disconnectRoom", data => disconnectRoomController(data, roomsManager, socket, io))
        socket.on("newMessage", data => newMessageController(data, roomsManager, socket))
        socket.on("disconnect", () => disconnectController(socket.id, roomsManager, io))
        socket.on("userTakePrint", data => userTakePrintController(data, roomsManager, socket))
    }
}

module.exports = ChatManager