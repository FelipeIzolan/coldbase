const joi = require("joi")

function validateCreateRoom(data, rooms) {
    return new Promise((res, rej) => {
        const findedRoom = rooms.find(room => room.leader === data.scoket_id)
        const schema = joi.object({
            username: joi
                .string()
                .min(1)
                .max(25)
                .required(),

            timestamp: joi
                .date()
                .required(),

            socket_id: joi
                .string()
                .min(20)
                .max(20)
                .required()
        }).validate()

        if (findedRoom) return rej({ status: "error", message: "Exis" })
        if (schema.error) return rej({ status: "error", message: schema.error.message })
        return res(schema.value)
    })
}