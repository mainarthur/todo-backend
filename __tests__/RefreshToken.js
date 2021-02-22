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

    it("has userId field", () => {
        expect(token.userId).toBeDefined()
    })

    it("toString and token are similar", () => {
        expect(token.token).toBe(token.toString())
        expect(token.token).toBe(token + "")
    })

    it("is not expired", () => {
        expect(token.isExpired()).toBeFalsy()
    })

    it("is not revoked", () => {
        expect(token.revoked).toBeFalsy()
    })

    let prevToken = token.token
    let prevExpireDate = token.expiresAt

    it("is updated", () => {
        token.update()
        expect(token.token).not.toBe(prevToken)
        expect(token.expiresAt).not.toBe(prevExpireDate)
    })


    it("is revoked", () => {
        token.revoke()
        expect(token.isExpired()).toBeTruthy()
        expect(token.revoked).toBeTruthy()
    })
})