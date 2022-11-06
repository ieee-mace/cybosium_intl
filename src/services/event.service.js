
const eventModel = require("../models/event.model")
const registrationModel = require("../models/registration.model");


const createEvent = async ({ name, description, price, date, registration_open, mode, created_by }) => {
    const event = new eventModel({
        name,
        description,
        price,
        date,
        registration_open,
        mode,
        created_by
    })
    await event.save()
    return event
}

const getAllEvents = async () => {
    return await eventModel.find({}).populate('created_by')
}

const getEventById = async (id) => {
    return await eventModel.findOne({ _id: id }).populate('created_by')
}

const getAllEventsWithRegistrationStatus = async (user) => {
    const events = await getAllEvents()
    // console.log("@@@@@@@@@@@@@")
    // console.log(user)
    const registeredEvents = await getRegisteredEvents(user)
    console.log("@@@@@", registeredEvents)
    const data = events.map(event => {
        const registered = registeredEvents.find(regEvent => regEvent._id.toString() === event._id.toString())
        return {
            ...event._doc,
            registered: registered ? true : false
        }
    })
    return data
}

const updateEvent = async ({ id, data }) => {
    const allowedFields = ["name", "description", "price", "date", "registration_open", "mode"]

    const event = await getEventById(id)

    for (let key in data) {
        if (!allowedFields.includes(key)) {
            return null
        }
        event[key] = data[key]
    }
    event.save()
    return event
}

const deleteEvent = async (id) => {
    return await eventModel.deleteOne({ _id: id })
}

const registerEvent = async ({ event, user, payment }) => {
    const registration = await registrationModel.create({
        event: event._id,
        user: user._id,
        payment: payment._id
    })
    registration.save()
    return registration
}

const getRegisteredEvents = async (user) => {
    const registrations = await registrationModel.find({ user: user._id }).populate('event')
    const events = registrations.map(registration => registration.event)
    return events
}


module.exports = {
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent,
    registerEvent,
    getRegisteredEvents,
    getAllEventsWithRegistrationStatus
}