export default class HeaderNotFoundError extends Error {
    constructor(headerName) {
        super(headerName)
        this.name = "HeaderNotFoundError"
    }
}