const mongoose = require("mongoose")

module.exports = () => {
    mongoose.connect("mongodb://mongo:27017/cybosium_db", {
        useNewUrlParser: true
    })
    .then(() => console.log("Mongodb connected"))
    .catch((err) => console.error(err))
}