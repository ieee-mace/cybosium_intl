const express = require("express")
const bodyParser = require('body-parser')
const passport = require('passport')
const cors = require('cors')

const app = express()

// MIDDLEWARES
app.use(cors())
// app.use(bodyParser.json({
//     verify: function(req, res, buf) {
//         let url = req.originalUrl
//         console.log("$$$$$$$$$$$$$$$$$$$")
//         console.log(url)
//         if(url.startsWith("/api/payments/successful-payment-webhook")) {
//             req.rawBody = buf.toString()
//         }
//     }
// }))
app.use((req, res, next) => {
    if (req.originalUrl.startsWith("/api/payments/successful-payment-webhook")) {
        next();
    } else {
        bodyParser.json()(req, res, next);
    }
});

app.use(passport.initialize())

require("./config/passport.config")

// ROUTES
app.use("/api/users", require("./routes/user.router"))
app.use("/api/auth", require("./routes/auth.router"))
app.use("/api/surveys", require("./routes/survey.router"))
app.use("/api/payments", require("./routes/payment.router"))

// RUN SERVER
module.exports = app
