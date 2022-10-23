const express = require('express')
const passport = require('passport')

const controller = require("../controllers/survey.controller")

const router = express.Router()

router.post("/", passport.authenticate('jwt', { session: false }), controller.addResponse)
router.get("/", passport.authenticate('jwt', { session: false }), controller.getResponse)
router.put("/", passport.authenticate('jwt', { session: false }), controller.updateResponse)
router.delete("/", passport.authenticate('jwt', { session: false }), controller.deleteResponse)

module.exports = router