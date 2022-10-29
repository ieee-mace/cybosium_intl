// create event model schema

const mongoose = require('mongoose')

const EventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    registration_open: {
        type: Boolean,
        required: true
    },
    mode: {
        type: String,
        required: true
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    registration_count: {
        type: Number,
        default: 0
    }
}, {timestamps: true})

module.exports = mongoose.model("event", EventSchema)