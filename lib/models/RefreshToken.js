import crypto from "crypto"


export default class RefreshToken {
    #expiresAt
    #revoked
    #token
    #userId

    // two days for refresh token
    constructor(userId, expiresIn = 2*24*60*60*1000) {
        this.#userId = userId
        this.#revoked = false
        this.#expiresAt = expiresIn + Date.now()
        this.#token = RefreshToken.generateRefreshToken()
    }

    static generateRefreshToken() {
        return crypto.randomBytes(256).toString("hex")
    }

    isExpired() {
        return this.#expiresAt < Date.now()
    }

    revoke() {
        this.#expiresAt = 0
        this.#revoked = true
    }

    get expiresAt() {
        return this.#expiresAt
    }

    get token() {
        return this.#token
    }

    get userId() {
        return this.#userId
    }

    get revoked() {
        return this.#revoked
    }


    update(expiresIn = 2*24*60*60*1000) {
        this.#expiresAt = expiresIn + Date.now()
        this.#token = RefreshToken.generateRefreshToken()
    }

    

}

RefreshToken.prototype.toString = function() {
    return this.token
}