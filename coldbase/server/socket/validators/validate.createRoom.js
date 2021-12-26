const Joi = require("joi")

function validateCreateRoom(data, rooms) {
    return new Promise((res, rej) => {
        const findedRoom = rooms.find(room => room.leader === data.socket_id)
        const schema = Joi.object({
            username: Joi
                .string()
                .min(1)
                .max(25)
                .required(),

            timestamp: Joi
                .date()
                .required(),

            socket_id: Joi
                .string()
                .min(20)
                .max(20)
                .required()

        }).validate(data)

        if (findedRoom) return rej({ status: "error", message: "Existing room." })
        if (schema.error) return rej({ status: "error", message: schema.error.message })
        return res(schema.value)
    })
}

module.exports = validateCreateRoom