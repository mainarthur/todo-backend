export default class RefreshTokenError extends Error {
    constructor(headerName) {
        super(headerName)
        this.name = "RefreshTokenError"
    }
}