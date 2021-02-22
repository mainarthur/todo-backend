import RefreshToken from "../lib/models/RefreshToken.js"

describe("RefreshToken", function () {
    const token = new RefreshToken()

    it("has token field", () => {
        expect(token.token).toBeDefined()
    })

    it("has expiresAt field", () => {
        expect(token.expiresAt).toBeDefined()
    })

    it("has revoked field", () => {
        expect(token.revoked).toBeDefined()
    })


    it("has revoke field", () => {
        expect(token.revoke).toBeDefined()
    })

    it("has isExpired field", () => {
        expect(token.isExpired).toBeDefined()
    })

    it("has update field", () => {
        expect(token.update).toBeDefined()
    })

    it("toString and token are similar", () => {
        expect(token.token).toBe(token.toString())
        expect(token.token).toBe(token + "")
    })

    it("not expired", () => {
        expect(token.isExpired()).toBeFalsy()
    })
})