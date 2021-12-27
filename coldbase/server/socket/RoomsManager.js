class RoomsManager {
    constructor() {
        this.rooms = []
    }

    getUsers(keyRoom){
        var room = this.rooms.find(r => r.keyRoom == keyRoom)
        return room.users
    }

    addRoom(room) { this.rooms.push(room) }
    addUserInRoom(keyRoom, user) {
        var room = this.rooms.find(r => r.keyRoom == keyRoom)
        room.users.push(user)
    }

    removeRoom(leader) { this.rooms = this.rooms.filter(room => room.leader !== leader) }
    removeUserFromRoom(keyRoom, userId) {
        var room = this.rooms.find(r => r.keyRoom == keyRoom)
        room.users = room.users.filter(user => user.socket_id !== userId)
    }
}

module.exports = RoomsManager