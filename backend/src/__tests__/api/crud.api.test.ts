import supertest, { Response } from "supertest";
import { app } from "../../app"
import { destroyDbConnection, startDbConnection } from "../util/db.mock";
import { isValidError, isValidErrorResonseBody, isValidSuccessResonseBody } from "../util/valid-response";

let request: supertest.SuperTest<supertest.Test>
let id: string
beforeAll(() => {
    destroyDbConnection()
    request = supertest(app(startDbConnection))
})

describe('All Error crud/ create', () => {
    it("missing field /400 ", async () => {
        const res = await request.post("/apis/crud").send().expect(400)
        isValidErrorResonseBody(res)
        isValidError(res)
    })
    it("inappropriate age field /400 ", async () => {
        const res = await request.post("/apis/crud").send({
            email: "pallavsaikia57@gmail.com",
            lastname: "pallav",
            firstname: "saikia",
            isadult: true,
            age: "Da"
        }).expect(400)
        isValidErrorResonseBody(res)
        isValidError(res)

    })
    it("sending alphanumeric name and invalid email /400 ", async () => {
        const res = await request.post("/apis/crud").send({
            email: "pallavsaikia",
            lastname: "pallav",
            firstname: "saikia",
            isadult: true,
            age: 28
        }).expect(400)
        isValidErrorResonseBody(res)
        isValidError(res)
    })
})

describe('successsfull  crud/ create', () => {
    it("all fields okay /201 ", async () => {
        const res = await request.post("/apis/crud").send({
            email: "pallavsaikia57@gmail.com",
            lastname: "pallav",
            firstname: "saikia",
            isadult: true,
            age: 28
        }).expect(201)
        id = res.body.data.user._id
        await request.post("/apis/crud").send({
            email: "pallabidewri@gmail.com",
            lastname: "pallabi",
            firstname: "dewri",
            isadult: true,
            age: 28
        })
        await request.post("/apis/crud").send({
            email: "ankursaikia@gmail.com",
            lastname: "ankur",
            firstname: "saikia",
            isadult: false,
            age: 28
        })
        isValidSuccessResonseBody(res)
    })
    it("duplicate email id-db conflict /409 ", async () => {
        const res = await request.post("/apis/crud").send({
            email: "pallavsaikia57@gmail.com",
            lastname: "pallav",
            firstname: "saikia",
            isadult: true,
            age: 18
        }).expect(409)
        isValidErrorResonseBody(res)
        isValidError(res)
    })
})

describe('crud/ get', () => {
    it("get users list", async () => {
        const res = await request.get("/apis/crud").send().expect(200)
        isValidSuccessResonseBody(res)
        expect(res.body.data).toEqual(
            expect.objectContaining({
                user: expect.any(Array),
            }))

        expect(res.body.data.user.length).toBe(3)
    })
})

describe('crud/ get by valid id', () => {
    it("get user with all its fields ", async () => {
        const res = await request.get("/apis/crud/" + id).send().expect(200)
        isValidSuccessResonseBody(res)
        expect(res.body.data.user).toEqual(
            expect.objectContaining({
                _id: expect.any(String),
                email: expect.any(String),
                lastname: expect.any(String),
                firstname: expect.any(String),
                isAdult: expect.any(Boolean),
                age: expect.any(Number),
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }))
    })
})

describe('crud/ get by invalid id', () => {
    it("get user with all its fields ", async () => {
        const res = await request.get("/apis/crud/" + "A3a3a3a").send().expect(409)
        isValidErrorResonseBody(res)
        isValidError(res)
    })
})

describe('crud/ get by invalid id', () => {
    it("get user with all its fields ", async () => {
        const res = await request.get("/apis/crud/" + "A3a3a3a").send().expect(409)
        isValidErrorResonseBody(res)
        isValidError(res)
    })
})


describe('crud/ update by  id', () => {
    it("get user with all its fields ", async () => {
        const res = await request.put("/apis/crud/" + id).send({
            email: "pallavsaikia@gmail.com",
            lastname: "pallav",
            firstname: "saikia",
            isadult: true,
            age: 27
        }).expect(200)
        isValidSuccessResonseBody(res)
    })
})

describe('crud/ update by  id errors', () => {
    it("update with missing fields-400", async () => {
        const res = await request.put("/apis/crud/" + id).send({
            lastname: "pallav",
            firstname: "saikia",
            isadult: true,
            age: 27
        }).expect(400)
        isValidErrorResonseBody(res)
        isValidError(res)
    })
    it("update with invalid id -409", async () => {
        const res = await request.put("/apis/crud/" + "3321324").send({
            email: "pallavsaikia@gmail.com",
            lastname: "pallav",
            firstname: "saikia",
            isadult: true,
            age: 27
        }).expect(409)
        isValidErrorResonseBody(res)
        isValidError(res)
    })

})


describe('crud/ delete by  id-errors', () => {
    it("delete with invalid id", async () => {
        const res = await request.delete("/apis/crud/" + "3321324").send().expect(409)
        isValidErrorResonseBody(res)
        isValidError(res)
    })

})
describe('crud/ delete by  id', () => {
    it("delete with valid id", async () => {
        const res = await request.delete("/apis/crud/" + id).send().expect(200)
        isValidSuccessResonseBody(res)
    })

})
afterAll(() => {
    // destroyDbConnection()
})