const jwt = require('jsonwebtoken')

const User = require("../models/user.model")

const register = async (req, res) => {
    const { firstname, lastname, email, password } = req.body
    if(!firstname || !lastname || !email || !password) {
        return res.status(400).json({
            "msg": "Required fields [firstname, lastname, email, password]"
        })
    }
    const user = await User.findOne({ email })
    if(user) {
        return res.status(400).json({
            "msg": "Email already exists"
        })
    }

    const newUser = new User({ firstname, lastname, email, password })
    newUser.save()

    const token = jwt.sign(email, "some_secret_key")

    res.status(201).json({ token })
}

module.exports = {
    register
}