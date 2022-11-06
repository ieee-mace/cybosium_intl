const passport = require('passport')

const User = require('../models/user.model')

const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.PASSPORT_SECRET_KEY;

passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    console.log("payload", jwt_payload)
    User.findOne({ _id: jwt_payload.id }, function (err, user) {
        console.log("user", user)
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));

