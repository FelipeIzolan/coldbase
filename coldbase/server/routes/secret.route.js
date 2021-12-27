const express = require("express")
const SHA1 = require("crypto-js/sha1")
const router = express.Router()

function getRandomString() { return (Math.random() + Date.now()).toString(36) }
function generateSecret() { return SHA1(getRandomString()).toString() }

var secret = generateSecret()
setInterval(() => secret = generateSecret(), 3600000) // 1 hour

router.get("/", (req, res) => {
    console.log(secret)
    return res.send(secret)
})

module.exports = router