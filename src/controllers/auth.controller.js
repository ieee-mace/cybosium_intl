const userService = require("../services/user.service")


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
    const user = await userService.getUserByEmail(email)
    if(user) {
        return res.status(400).json({
            success: false,
            message: "Email already exists"
        })
    }

    // CREATE NEW USER
    const newUser = await userService.createUser({firstname, lastname, email, password})
    const token = userService.generateToken(newUser)

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
    const user = await userService.getUserByLoginCredentials({ email, password })
    if(!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        })
    }

    const token = await userService.generateToken(user)
    
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