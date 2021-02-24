import User from "./User.js"


describe("User", () => {
    let user = new User("Mike", "test@test.com", "wijefhiw9ehf8WYG9FR3987")
    
    it("created", () => {
        expect(user).toBeDefined()
    })

    it("all fields are required", () => {
        expect(() => new User(null, "email", "hash")).toThrow("name")
        expect(() => new User("name", null, "hash")).toThrow("email")
        expect(() => new User("name", "email")).toThrow("password")
    })

    it("has a strange name", () => {
        expect(() => new User("Аnastaсия", "nastya@gmail.com", "wqr")).toThrow("name")
    })

    it("has invalid email format", () => {
        expect(() => new User("Nastya", "@gmail.com", "wqr")).toThrow("email")
    })

    it("has a name field", () => {
        expect(user.name).toBeDefined()
    })
    it("has a email field", () => {
        expect(user.email).toBeDefined()
    })
    it("has a passwordHash field", () => {
        expect(user.passwordHash).toBeDefined()
    })
    it("has a id field", () => {
        expect(user.id).toBeDefined()
    })

    it("id is readonly", () => {
        expect(()=>user.id = "bla bla").toThrow()
    })


})