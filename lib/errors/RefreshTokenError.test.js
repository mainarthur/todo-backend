import RefreshTokenError from "./RefreshTokenError.js"

describe("RefreshTokenError", () => {
    const error = new RefreshTokenError()
    it("valid error name", () => {
        expect(error.name).toBe("RefreshTokenError")
    })

    it("empty message", () => {
        expect(() => {
            throw error
        }).toThrow("")
    })

    it("with header in message", () => {
        expect(() => {
            throw new RefreshTokenError("invalid token length")
        }).toThrow("invalid token length")
    })
})