const request = require('supertest');
const { dbConnect, dbDisconnect, dropCollections } = require("./db");
const { createUser, getUsers, generateToken } = require("../services/user.service")
const app = require("../app");
const { addSurveyResponse } = require('../services/survey.service');


beforeAll(async () => await dbConnect());
afterAll(async () => await dbDisconnect());

describe("Survey Tests", () => {
    let user
    beforeEach(async () => {
        user = await createUser({
            firstname: "John",
            lastname: "Doe",
            email: "johndoe@gmail.com",
            password: "johndoe@123"
        })
    })

    afterEach(async () => await dropCollections())

    // API TESTS
    test("POST /api/surveys/", async () => {
        console.log(user)
        const response = await request(app)
            .post("/api/surveys/")
            .send({
                data: JSON.stringify({
                    "1": "hello world",
                    "2": "hey threre"
                })
            })
            .set("Content-Type", "application/json")
            .set("Authorization", "Bearer " + generateToken(user))
        expect(response.statusCode).toEqual(200)
    });

    test("GET /api/surveys/", async () => {
        await addSurveyResponse({data: JSON.stringify({
            "1": "hello world",
            "2": "hey threre"
        }), user})

        const response = await request(app)
            .get("/api/surveys/")
            .set("Content-Type", "application/json")
            .set("Authorization", "Bearer " + generateToken(user))
        expect(response.statusCode).toEqual(200)
    });
});