const mongoose = require("mongoose")

const SurveySchema = new mongoose.Schema({
    data: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

module.exports = mongoose.model("survey", SurveySchema)