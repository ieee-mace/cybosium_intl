const express = require("express")
const bodyParser = require('body-parser')
const passport = require('passport')
const cors = require('cors')
const morgan = require('morgan')

const app = express()

// MIDDLEWARES
app.use(cors())
app.use((req, res, next) => {
    if (req.originalUrl.startsWith("/api/payments/successful-payment-webhook")) {
        next();
    } else {
        bodyParser.json()(req, res, next);
    }
});
app.use(morgan('tiny'))

require('dotenv').config()

app.use(passport.initialize())
require("./config/passport.config")


// ROUTES
app.use("/api/users", require("./routes/user.router"))
app.use("/api/auth", require("./routes/auth.router"))
app.use("/api/surveys", require("./routes/survey.router"))
app.use("/api/payments", require("./routes/payment.router"))
app.use("/api/events", require("./routes/event.router"))

// RUN SERVER
module.exports = app
