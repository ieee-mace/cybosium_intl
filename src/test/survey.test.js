const request = require('supertest');
const { dbConnect, dbDisconnect, dropCollections } = require("./db");
const { createUser, generateToken } = require("../services/user.service")
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
        // ADD A SURVEY
        const res1 = await request(app)
            .post("/api/surveys/")
            .send({
                data: JSON.stringify({
                    "1": "hello world",
                    "2": "hey threre"
                })
            })
            .set("Content-Type", "application/json")
            .set("Authorization", "Bearer " + generateToken(user))

        expect(res1.statusCode).toEqual(200)
            
        // SHOULDN'T ADD ANOTHER SURVEY
        const res2 = await request(app)
            .post("/api/surveys/")
            .send({
                data: JSON.stringify({
                    "1": "hello world",
                    "2": "hey threre"
                })
            })
            .set("Content-Type", "application/json")
            .set("Authorization", "Bearer " + generateToken(user))

        expect(res2.statusCode).toEqual(400)        
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
        expect(response.body).toHaveProperty(["survey"])
    });

    test("PUT /api/surveys/", async () => {
        // CHECK RESPONSE WITHOUT ADDING A SURVEY
        let response, data
        response = await request(app)
            .put("/api/surveys/")
            .send({ data })
            .set("Content-Type", "application/json")
            .set("Authorization", "Bearer " + generateToken(user))

        expect(response.statusCode).toEqual(400)
        
        // CHECK RESPONSE AFTER ADDING A SURVEY
        await addSurveyResponse({data: JSON.stringify({
            "1": "hello world",
            "2": "hey threre"
        }), user})
        
        data = "hello"
        response = await request(app)
            .put("/api/surveys/")
            .send({ data })
            .set("Content-Type", "application/json")
            .set("Authorization", "Bearer " + generateToken(user))

        expect(response.statusCode).toEqual(200)
        expect(response.body).toHaveProperty(["survey"])
        expect(response.body.survey.data).toBe(data)
    });

    test("DELETE /api/surveys/", async () => {
        // CHECK RESPONSE WITHOUT DELETING A SURVEY
        let response, data
        response = await request(app)
            .delete("/api/surveys/")
            .set("Authorization", "Bearer " + generateToken(user))

        expect(response.statusCode).toEqual(400)
        
        // CHECK RESPONSE AFTER DELETING A SURVEY
        await addSurveyResponse({data: JSON.stringify({
            "1": "hello world",
            "2": "hey threre"
        }), user})
        
        data = "hello"
        response = await request(app)
            .delete("/api/surveys/")
            .set("Authorization", "Bearer " + generateToken(user))

        expect(response.statusCode).toEqual(200)
    });
});