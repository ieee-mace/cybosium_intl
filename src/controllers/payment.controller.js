const SECRET_KEY = "sk_test_51LwKpeSCUt1T7dp6nZyVQgO0IsQ1bwZZZ81toqSbq5PbDE2JiWOWCuZKTdYoUowdB4lHftLsjlIPWmpJvGOe69F800Z07TYJoh"
const WEBHOOK_SECRET_KEY = "whsec_ip8nI7S3etaXW7bk8IHv3SYRNo44O6b1"

const stripe = require('stripe')(SECRET_KEY)

const successfulPaymentWebHook = async (req, res) => {
    const sig = req.headers['stripe-signature']

    let event = null
    try {
        console.log({body: req.body, sig})
        event = stripe.webhooks.constructEvent(req.body, sig, WEBHOOK_SECRET_KEY);
        stripe.webhooks.constructEvent()
    } catch(err) {
        console.log(err)
        return res.status(400).send()
    }
    console.log("####################")
    console.log(req.body)
    return res.status(200).send()
}


const createCheckoutSession = async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price: "price_1LwNFQSCUt1T7dp659pVlZyr",
                quantity: 1
            }
        ],
        mode: "payment",
        success_url: "http://localhost:3000/dashboard?success=true",
        cancel_url: "http://localhost:3000/dashboard?canceled=true"
    })

    console.log("@@@@@@@@@@@@@@@@")
    console.log(session)

    return res.status(200).json({
        success: true,
        url: session.url
    })
}

module.exports = {
    createCheckoutSession,
    successfulPaymentWebHook
}