const express = require('express')
const passport = require('passport')

const controller = require("../controllers/user.controller")

const router = express.Router()

router.get("/whoami", passport.authenticate('jwt', { session: false }), controller.whoami)

module.exports = router