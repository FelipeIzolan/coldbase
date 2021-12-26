class RoomsManager {
    constructor() {
        this.rooms = []
    }

    addRoom(room) { this.rooms.push(room) }
    removeRoom(leader) { this.rooms = this.rooms.filter(room => room.leader !== leader) }
    removeUserFromRoom(keyRoom, userId) {
        var room = this.rooms.find(r => r.keyRoom == keyRoom)
        room.users = room.users.filter(user => user.socket_id !== userId)
    }
}

module.exports = RoomsManager