export default class InvalidHeaderValueError extends Error {
    constructor(headerName, value) {
        super(`${headerName}: ${value}`)
        this.name = "InvalidHeaderValueError"
    }
}