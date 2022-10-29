const RegistrationSchema = new Schema({
    event_id: {
        type: Schema.Types.ObjectId,
        ref: "event",
        required: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    payment_id: {
        type: String,
        required: true
    },
    payment_status: {
        type: String,
        required: true
    },
    payment_amount: {
        type: Number,
        required: true
    },
    payment_receipt_url: {
        type: String,
        required: true
    },
    payment_receipt_email: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("registration", RegistrationSchema)