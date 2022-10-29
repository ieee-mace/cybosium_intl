const mongoose = require("mongoose")
const eventModel = require("../models/event.model")
const validator = require('validator').default
const services = require("../services/event.service")

const createEvent = async (req, res) => {
    const {name, description, price, date, registration_open, mode} = req.body
    if(!name || !description || !price || !date || !registration_open || !mode) {
        return res.status(400).json({
            success: false,
            message: "Required fields [name, description, price, date, registration_open, mode]"
        })
    }

    if(!validator.isDate(date)) {
        return res.status(400).json({
            success: false,
            message: "Invalid date format"
        })
    }

    if(!(mode === "online" || mode === "offline")) {
        return res.status(400).json({
            success: false,
            message: "Valid modes [online, offline]"
        })
    }

    const event = await services.createEvent({name, description, price, date, registration_open, mode, created_by: req.user._id})
    return res.status(200).json({
        success: true,
        message: "Event created successfully",
        event
    })
}

const getAllEvents = async (req, res) => {
    const events = await services.getAllEvents()
    return res.status(200).json({
        success: true,
        message: "Events fetched successfully",
        events
    })
}

const getEventById = async (req, res) => {
    const {id} = req.params

    if(!mongoose.isValidObjectId(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid event id"
        })
    }


    let event = await services.getEventById(id)
    if(!event) {
        return res.status(400).json({
            success: false,
            message: "Event not found"
        })
    }
    return res.status(200).json({
        success: true,
        message: "Event found",
        event
    })
}

const updateEvent = async (req, res) => {
    const {id} = req.params
    if(!mongoose.isValidObjectId(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid event id"
        })
    }

    let event = await services.getEventById(id)
    if(!event) {
        return res.status(400).json({
            success: false,
            message: "Event not found"
        })
    }
    
    event = await services.updateEvent({id, data: req.body})
    if(!event) {
        return res.status(400).json({
            success: false,
            message: "Allowed fields [name, description, price, date, registration_open, mode]"
        })
    }

    return res.status(200).json({
        success: true,
        message: "Event updated successfully",
        event
    })

}

const deleteEvent = async (req, res) => {
    const { id } = req.params
    if(!mongoose.isValidObjectId(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid event id"
        })
    }

    const deleteResponse = await services.deleteEvent(id)
    if(deleteResponse.deletedCount == 0) {
        return res.status(400).json({
            success: false,
            message: "Event not found"
        })
    }
    return res.status(200).json({
        success: true,
        message: "Event deleted successfully",
    })
}


module.exports = {
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent
}