const mongoose = require('mongoose')

const AnswerSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Question",
        required: true
    },
    question: {
        type: mongoose.SchemaType.ObjectId,
        ref: "Answer",
        required: true
    }
})

module.exports = mongoose.model("Answer", AnswerSchema)