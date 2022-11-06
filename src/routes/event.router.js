const express = require('express')
const passport = require('passport')
const isAdmin = require('../config/role.config')

const controller = require("../controllers/event.controller")

const router = express.Router()

router.post("/", passport.authenticate('jwt', { session: false }), isAdmin(), controller.createEvent)
router.get("/", passport.authenticate('jwt', { session: false }), controller.getAllEvents)
router.get("/:id", passport.authenticate('jwt', { session: false }), controller.getEventById)
router.put("/:id", passport.authenticate('jwt', { session: false }), isAdmin(), controller.updateEvent)
router.delete("/:id", passport.authenticate('jwt', { session: false }), isAdmin(), controller.deleteEvent)

router.post("/:id/register", passport.authenticate('jwt', { session: false }), controller.registerEvent)

module.exports = router