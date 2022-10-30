const crypto = require("crypto")
const paymentModel = require('../models/payment.model')


const SECRET_KEY = "sk_test_51LwKpeSCUt1T7dp6nZyVQgO0IsQ1bwZZZ81toqSbq5PbDE2JiWOWCuZKTdYoUowdB4lHftLsjlIPWmpJvGOe69F800Z07TYJoh"
const WEBHOOK_SECRET_KEY = "whsec_ip8nI7S3etaXW7bk8IHv3SYRNo44O6b1"

const stripe = require('stripe')(SECRET_KEY)

const getCheckoutSession = async ({price_id, client_reference_id}) => {
    return await stripe.checkout.sessions.create({
        line_items: [
            {
                price: price_id,
                quantity: 1
            }
        ],
        client_reference_id: client_reference_id,
        mode: "payment",
        success_url: "http://localhost:3000/dashboard?success=true",
        cancel_url: "http://localhost:3000/dashboard?canceled=true"
    })
}

const paymentSession = async ({ event, user, price_id }) => {
    const client_reference_id = crypto.randomBytes(20).toString('hex');
    const session = await getCheckoutSession({ price_id, client_reference_id })
    console.log(session.id)

    await createPayment({ user, event, session_id: session.id, client_reference_id })
    return session
}

const getPaymentFromClientReferenceId = async (client_reference_id) => {
    return await paymentModel.findOne({ client_reference_id }).populate('user').populate('event')
}

const createPayment = async ({user, event, session_id, client_reference_id}) => {
    const payment = new paymentModel({
        user: user._id,
        event: event._id,
        session_id,
        client_reference_id
    })
    await payment.save()
    return payment
}

const updatePayment = async ({client_reference_id, payment_id, payment_completed, payment_amount, payment_receipt_url, payment_receipt_email}) => {
    const payment = await getPaymentFromClientReferenceId(client_reference_id)
    payment.payment_id = payment_id
    payment.payment_completed = payment_completed
    payment.payment_amount = payment_amount
    payment.payment_receipt_url = payment_receipt_url
    payment.payment_receipt_email = payment_receipt_email
    payment.save()
    return payment
}

module.exports = {
    getCheckoutSession,
    createPayment,
    updatePayment,
    paymentSession,
    getPaymentFromClientReferenceId,
}