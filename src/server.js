const db = require("./config/db.config")

db()

const app = require("./app")

const PORT = "8000"

app.listen(PORT, () => {
    console.log(`server running on localhost:${PORT}`)
})

