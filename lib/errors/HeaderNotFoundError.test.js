import HeaderNotFoundError from "./HeaderNotFoundError.js"

describe("HeaderNotFoundError", () => {
    const error = new HeaderNotFoundError()
    it("valid error name", () => {
        expect(error.name).toBe("HeaderNotFoundError")
    })

    it("empty message", () => {
        expect(() => {
            throw error
        }).toThrow("")
    })

    it("with header in message", () => {
        expect(() => {
            throw new HeaderNotFoundError("Content-Type")
        }).toThrow("Content-Type")
    })
})