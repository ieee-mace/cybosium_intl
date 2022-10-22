const express = require("express")
const bodyParser = require('body-parser')
const passport = require('passport')

const app = express()

// MIDDLEWARES
app.use(bodyParser.json())
app.use(passport.initialize())

require("./config/passport.config")

// ROUTES
app.use("/api/users", require("./routes/user.router"))
app.use("/api/auth", require("./routes/auth.router"))
app.use("/api/surveys", require("./routes/survey.router"))

// RUN SERVER
module.exports = app
