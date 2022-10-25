const bodyParser = require('body-parser')
const express = require('express')
const passport = require('passport')

const controller = require("../controllers/payment.controller")

const router = express.Router()

router.post("/create-checkout-session", passport.authenticate('jwt', { session: false }), controller.createCheckoutSession)
router.post("/successful-payment-webhook", bodyParser.raw({type: 'application/json'}), controller.successfulPaymentWebHook)

module.exports = router