import { destroyDbConnection, startDbConnection } from "../util/db.mock";
import { TestScehma, TestModel, TestDoc } from "./model/mock";



function validateDocumentBody(data: TestDoc | TestModel) {
    expect(data).toEqual(
        expect.objectContaining({
            _id: expect.any(String),
            email: expect.any(String),
            name: expect.any(String),
            isMarried: expect.any(Boolean),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        }))
}
describe('database before Data is entered', () => {
    beforeAll(() => {
        destroyDbConnection()
        startDbConnection()
    })
    it("DB findAll returns empty array", async () => {
        const findAllEmpty = await new TestScehma().findAll()
        expect(findAllEmpty.length).toBe(0)
    })
    it("DB findByIDAndUpdate returns null", async () => {
        const findByIDAndUpdateEmpty = await new TestScehma().findByIDAndUpdate("23232323", { email: "#@32" })
        expect(findByIDAndUpdateEmpty).toBe(null)
    })
    it("DB deleteByID returns null", async () => {
        const delteByIDEmpty = await new TestScehma().deletedByID("23232323")
        expect(delteByIDEmpty).toBe(null)
    })
    afterAll(() => {
        destroyDbConnection()
    })
})

describe('database before after Data is entered', () => {
    beforeAll(() => {
        destroyDbConnection()
        startDbConnection()
    })
    let testdata
    it("Adding  rows of data and checking the return body after save", async () => {
        const findAllEmpty = await new TestScehma().findAll()
        expect(findAllEmpty.length).toBe(0)

        testdata = await new TestScehma({
            email: "add@gmail.com",
            name: "add",
            isMarried: true
        }).save()
        await new TestScehma({
            email: "add1@gmail.com",
            name: "add1",
            isMarried: true
        }).save()
        await new TestScehma({
            email: "add2@gmail.com",
            name: "add2",
            isMarried: false
        }).save()
        validateDocumentBody(testdata)
    })
    it("DB findAll returns array of documents and document validation", async () => {
        const data = await new TestScehma().findAll()
        expect(data.length).toBe(3)
        validateDocumentBody(data[0])
    })
    it("DB findByID returns an object(TestDoc) for valid id", async () => {
        const data = await new TestScehma().findByID(testdata!._id)
        expect(data).not.toBe(null)
        validateDocumentBody(data!)
    })
    it("DB findByID returns an null for invalid id", async () => {
        const data = await new TestScehma().findByID("1212daad")
        expect(data).toBe(null)
    })
    it("DB findByIDAndUpdate updates field if valid id sent", async () => {
        const data = await new TestScehma().findByIDAndUpdate(testdata!._id, { name: "pallav" })
        expect(data!.name).toBe("pallav")
    })
    it("DB findByIDAndUpdate throws invalid id error if id invalid", async () => {
        new TestScehma().findByIDAndUpdate("aa212", { name: "pallav" }).then().catch(e => {
            expect(e).toBe("invalid id")
        })
    })

    it("DB deletedByID deletes row", async () => {
        const data = await new TestScehma().deletedByID(testdata!._id)
        validateDocumentBody(data!)
        const afterDelete = await new TestScehma().findByID(testdata!._id)
        expect(afterDelete).toBe(null)
    })

    afterAll(() => {
        destroyDbConnection()
    })
})