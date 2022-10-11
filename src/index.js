const PORT = "8000"

const express = require("express")
const bodyParser = require('body-parser')

const db = require("./config/db.config")


const app = express()

// CONNECT DB
db()

// MIDDLEWARES
app.use(bodyParser.json())

// ROUTES
app.use("/api/auth", require("./routes/auth.router"))

// RUN SERVER
app.listen(PORT, () => {
    console.log(`server running on localhost:${PORT}`)
})