const jwt = require('jsonwebtoken')

const User = require("../models/user.model")

const generateToken = (user) => {
    const payload = {
        id: user._id,
        email: user.email
    }
    return jwt.sign(payload, "some_secret_key")
}

const register = async (req, res) => {
    // FIELDS VALIDATION
    const { firstname, lastname, email, password } = req.body
    if(!firstname || !lastname || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "Required [firstname, lastname, email, password]"
        })
    }

    // EMAIL VALIDATION
    const user = await User.findOne({ email })
    if(user) {
        return res.status(400).json({
            success: false,
            message: "Email already exists"
        })
    }

    // CREATE NEW USER
    let newUser
    try {
        newUser = new User({ firstname, lastname, email, password })
        newUser.save()
    }
    catch(err) {
        return res.status(400).json({
            success: false,
            error: err
        })
    }

    const token = generateToken(newUser)

    res.status(201).json({
        success: true,
        message: "User created",
        token,
        user: {
            id: newUser._id,
            email: newUser.email
        }
    })
}

const login = async (req, res) => {
    // FIELD VALIDATION
    const { email, password } = req.body
    if(!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Required [email, password]"
        })
    }

    // FIND USER
    const user = await User.findOne({ email, password })
    if(!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        })
    }

    const token = generateToken(user)
    
    res.status(200).json({
        success: true,
        token,
        user: {
            id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
        }
    })
}

module.exports = {
    register,
    login
}