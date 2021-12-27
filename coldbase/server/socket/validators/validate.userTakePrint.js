const Joi = require("joi")

function validateUserTookPrint(data, rooms) {
    return new Promise((res, rej) => {
        const findedRoom = rooms.find(room => room.keyRoom === data.keyRoom)
        const schema = Joi.object({
            username: Joi
                .string()
                .min(1)
                .max(25)
                .required(),

            socket_id: Joi
                .string()
                .min(20)
                .max(20)
                .required(),

            keyRoom: Joi
                .string()
                .max(40)
                .min(40)
                .required()

        }).validate(data)

        if (!findedRoom) return rej({ status: "error", message: "Inexistent room." })
        if (schema.error) return rej({ status: "error", message: schema.error.message })
        return res(schema.value)
    })
}

module.exports = validateUserTookPrint