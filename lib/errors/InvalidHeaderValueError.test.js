import InvalidHeaderValueError from "./InvalidHeaderValueError.js"

describe("InvalidHeaderValueError", () => {
    const error = new InvalidHeaderValueError()
    it("valid error name", () => {
        expect(error.name).toBe("InvalidHeaderValueError")
    })

    it("empty message", () => {
        expect(() => {
            throw error
        }).toThrow("")
    })

    it("with header in message", () => {
        expect(() => {
            throw new InvalidHeaderValueError("Content-Type", "shit")
        }).toThrow("Content-Type: shit")
    })
})