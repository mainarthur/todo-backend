import ToDo from "./ToDo.js"

describe("ToDo", () => {
    let toDo = new ToDo("123")

    it("has text", () => {
        expect(toDo.text).toBeDefined()
    })
})