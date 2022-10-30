const mongoose = require("mongoose")

const PaymentSchema = new mongoose.Schema({
    client_reference_id: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "event",
        required: true
    },
    session_id: {
        type: String,
        required: true
    },
    payment_completed: {
        type: Boolean,
        required: true,
        default: false
    },
    payment_intent: {
        type: String,
        required: false
    },
    payment_amount: {
        type: Number,
        required: false
    },
    payment_receipt_url: {
        type: String,
        required: false
    },
    payment_receipt_email: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model("payment", PaymentSchema)