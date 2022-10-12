const userModel = require("../models/user.model")

const API_URL = "http://localhost:8000/api"

beforeAll(() => {
    const user = userModel.create({
        firstname: "John",
        lastname: "Doe",
        email: "johndoe@gmail.com",
        password: "johndoe"
    })
})

test('Fetching Questions', async () => {
    fetch(`${API_URL}/questions`, {
        method: "GET",

    })
})