const PORT = "8000"

const express = require("express")
const bodyParser = require('body-parser')
const passport = require('passport')

const db = require("./config/db.config")

const app = express()


// CONNECT DB
db()

// MIDDLEWARES
app.use(bodyParser.json())
app.use(passport.initialize())

require("./config/passport.config")

// ROUTES
app.use("/api/users", require("./routes/user.router"))
app.use("/api/auth", require("./routes/auth.router"))
app.use("/api/questions", require("./routes/question.router"))

// RUN SERVER
app.listen(PORT, () => {
    console.log(`server running on localhost:${PORT}`)
})