import ToDo from "./ToDo.js"

describe("ToDo", () => {
    let toDo = new ToDo("123")


    it("has text field", () => {
        expect(toDo.text).toBeDefined()
    })
    it("has done field", () => {
        expect(toDo.done).toBeDefined()
    })
    it("has id field", () => {
        expect(toDo.id).toBeDefined()
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


    it("done from constructor", () => {
        let toDo = new ToDo("new todo", true)
        expect(toDo.done).toBeTruthy()
    })

    it("id is changed", () => {
        let toDo = new ToDo("new todo", true)
        let prevId = toDo.id
        toDo = new ToDo("new todo", true)
        expect(toDo.id).not.toBe(prevId)
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

    it("valid json from toJSON", () => {
        let toDo = new ToDo("some task")
        let json = toDo.toJSON()

        expect(json).toEqual({
            text: toDo.text,
            done: toDo.done,
            id: toDo.id,
            createdAt: toDo.createdAt,
            lastUpdate: toDo.lastUpdate,
            position: toDo.position,
            deleted: toDo.deleted
        })
    })

    it("error with no text", () => {
        expect(() => {
            new ToDo()
        }).toThrow()
    })

    it("text is changing", () => {
        let prevText = toDo.text
        toDo.text = "111"
        expect(prevText).not.toBe(toDo.text)
    })

    it("id is readonly", () => {
        expect(() => {
            toDo.id = "bla bla"
        }).toThrow()
    })

    it("createdAt is readonly", () => {
        expect(() => {
            toDo.createdAt = "bla bla"
        }).toThrow()
    })
})