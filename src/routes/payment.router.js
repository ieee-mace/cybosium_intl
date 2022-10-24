const express = require('express')
const passport = require('passport')

const controller = require("../controllers/payment.controller")

const router = express.Router()

router.post("/create-checkout-session", passport.authenticate('jwt', { session: false }), controller.createCheckoutSession)
router.post("/successful-payment-webhook", controller.successfulPaymentWebHook)

module.exports = router