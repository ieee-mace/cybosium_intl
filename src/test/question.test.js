const { dbConnect, dbDisconnect } = require("./db");
const { createUser } = require("../services/user.service")

beforeAll(async () => dbConnect());
afterAll(async () => dbDisconnect());

describe("Question Tests", () => {
    let user
    test("should get all questions", async () => {
        
    });
});