const services = require('../services/payment.service')
const eventServices = require('../services/event.service')

const SECRET_KEY = process.env.STRIPE_SECRET_KEY
const WEBHOOK_SECRET_KEY = process.env.WEBHOOK_SECRET_KEY

const stripe = require('stripe')(SECRET_KEY)

const fulfillOrder = async (session) => {
    console.log("Fulfilling order", session)
    const payment = await services.updatePayment({
        client_reference_id: session.client_reference_id,
        payment_intent: session.payment_intent,
        payment_completed: true,
        payment_amount: session.amount_total,
        payment_receipt_url: session.receipt_url,
        payment_receipt_email: session.customer_details.email
    })
    return payment
}

const successfulPaymentWebHook = async (req, res) => {
    const sig = req.headers['stripe-signature']
    let stripeEvent = null
    try {
        // console.log({body: req.body, sig})
        stripeEvent = stripe.webhooks.constructEvent(req.body, sig, WEBHOOK_SECRET_KEY);
    } catch (err) {
        console.log(`❌ Error message: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (stripeEvent.type === 'checkout.session.completed') {
        const session = stripeEvent.data.object;
        const payment = await fulfillOrder(session);
        await eventServices.registerEvent({ event: payment.event, user: payment.user, payment })
    }

    return res.status(200).send()
}


const createCheckoutSession = async (req, res) => {
    const session = await services.getCheckoutSession({ price_id: process.env.STRIPE_PRICE_ID })

    // console.log("@@@@@@@@@@@@@@@@")
    // console.log(session)
    return res.status(200).json({
        success: true,
        url: session.url
    })
}

module.exports = {
    createCheckoutSession,
    successfulPaymentWebHook
}