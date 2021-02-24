export default class RefreshTokenError extends Error {
    constructor(message) {
        super(message)
        this.name = "RefreshTokenError"
    }
}