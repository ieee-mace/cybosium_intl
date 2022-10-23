const mongoose = require("mongoose")

const SurveySchema = new mongoose.Schema({
    data: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    accepted: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("survey", SurveySchema)