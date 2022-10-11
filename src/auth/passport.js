const passport = require('passport')
const passportJWT = require('passport-jwt')

const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt

const User = require("../models/user")

passport.use(
    new JWTStrategy(
        {
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey: "some_secret_key"
        }, 
        (jwtPayload, done) => {
            return User.findById(jwtPayload.sub)
            .then(user => {
                return done(null, user)
            })
            .catch(err => {
                return done(err)
            })
        }
    )
)