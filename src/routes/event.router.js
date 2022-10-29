const express = require('express')
const passport = require('passport')

const controller = require("../controllers/event.controller")

const router = express.Router()

router.post("/", passport.authenticate('jwt', {session: false}), controller.createEvent)
router.get("/", controller.getAllEvents)
router.get("/:id", controller.getEventById)
router.put("/:id", passport.authenticate('jwt', {session: false}), controller.updateEvent)
router.delete("/:id", passport.authenticate('jwt', {session: false}), controller.deleteEvent)


module.exports = router