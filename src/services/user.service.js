const jwt = require('jsonwebtoken')

const userModel = require("../models/user.model")

const generateToken = (user) => {
    const payload = {
        id: user._id,
        email: user.email
    }
    return jwt.sign(payload, "some_secret_key")
}

const getUserByLoginCredentials = async ({ email, password }) => {
    return await userModel.findOne({ email, password })
}

const getUserByEmail = async (email) => {
    return await userModel.findOne({ email })
}

const getUserById = async (id) => {
    return await userModel.findById(id)
}

const createUser = async ({firstname, lastname, email, password}) => {
    return await userModel.create({ firstname, lastname, email, password })
}

const getUsers = async () => {
    return await userModel.find({})
}

module.exports = {
    generateToken,
    getUserByLoginCredentials,
    getUserByEmail,
    getUserById,
    createUser,
    getUsers,
}