const { RIPEMD160 } = require("crypto-js")

const roomManager = {
  rooms: [],
  redisClient: redisClient,
  setRooms: setRooms,
  getRooms: getRooms,
  create: create,
  remove: remove,
  join: join,
  leave: leave,
  getById: getById
}

module.exports = roomManager

async function redisClient(client) { 
  this.redisClient = client
  await this.getRooms()
}

async function setRooms() { await this.redisClient.set("rooms", JSON.stringify(this.rooms)) }
async function getRooms() { this.rooms = JSON.parse(await this.redisClient.get("rooms")) }

async function create(socketId, username) {
  await this.getRooms()

  let room = {
    leaderId: socketId,
    users: [{ id: socketId, username: username }],
    key: RIPEMD160(socketId + username + Date.now()).toString()
  }

  this.rooms.push(room)

  await this.setRooms()
  return room.key
}

async function remove(socketId) {
  await this.getRooms()

  let room = this.rooms.find(room => room.leaderId === socketId)

  if (room) {
    this.rooms = this.rooms.filter(currentRoom => currentRoom.leaderId !== room.leaderId)
  }

  await this.setRooms()
  return room ? (true) : (false)
}

async function join(socketId, username, key) {
  await this.getRooms()

  let room = this.rooms.find(room => room.key === key)

  if (room) {
    room.users.push({ id: socketId, username: username })
  }

  await this.setRooms()
  return room ? (true) : (false)
}

async function leave(socketId, key) {
  await this.getRooms()

  let room = this.rooms.find(room => room.key === key)

  if (room) {
    room.users = room.users.filter(user => user.id !== socketId)
  }

  await this.setRooms()
  return room ? (true) : (false)
}

async function getById(socketId) {
  await this.getRooms()
  const room = this.rooms.find(room => room ? room.users.some(user => user.id === socketId) : false)

  if (room) {
    return room
  } else {
    return null
  }
}
