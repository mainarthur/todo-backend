import ToDo from "./ToDo.js"

describe("ToDo", () => {
    let toDo = new ToDo({text: "123", userId: 123})

    it("created", () => {
        expect(toDo).not.toBeNull()
    })

    it("has text field", () => {
        expect(toDo.text).toBeDefined()
    })
    it("has done field", () => {
        expect(toDo.done).toBeDefined()
    })
    it("has _id field", () => {
        expect(toDo._id).toBeDefined()
    })
    it("has createdAt field", () => {
        expect(toDo.createdAt).toBeDefined()
    })
    it("has lastUpdate field", () => {
        expect(toDo.lastUpdate).toBeDefined()
    })
    it("has position field", () => {
        expect(toDo.position).toBeDefined()
    })
    it("has deleted field", () => {
        expect(toDo.deleted).toBeDefined()
    })

    it("has delete field", () => {
        expect(toDo.delete).toBeDefined()
    })

    it("has toJSON field", () => {
        expect(toDo.toJSON).toBeDefined()
    })

    it("has correct text", () => {
        expect(toDo.text).toBe("123")
    })

    it("undone", () => {
        expect(toDo.done).toBeFalsy()
    })


    it("done", () => {
        toDo.done = true
        expect(toDo.done).toBeTruthy()
    })



    it("lastUpdate is changing", async () => {
        let prevLastUpdate = toDo.lastUpdate
        await new Promise((r) => setTimeout(r, 2));
        toDo.done = true
        expect(toDo.lastUpdate).not.toBe(prevLastUpdate)
        prevLastUpdate = toDo.lastUpdate
        await new Promise((r) => setTimeout(r, 2));
        toDo.text = "true"
        expect(toDo.lastUpdate).not.toBe(prevLastUpdate)
        prevLastUpdate = toDo.lastUpdate
        await new Promise((r) => setTimeout(r, 2));
        toDo.deleted = true
        expect(toDo.lastUpdate).not.toBe(prevLastUpdate)
        prevLastUpdate = toDo.lastUpdate
        await new Promise((r) => setTimeout(r, 2));
        toDo.position = 123
        expect(toDo.lastUpdate).not.toBe(prevLastUpdate)
    })


    it("text is changing", () => {
        let prevText = toDo.text
        toDo.text = "111"
        expect(prevText).not.toBe(toDo.text)
    })
})