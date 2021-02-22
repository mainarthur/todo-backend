import { uuidv4 } from "../utils.js"
import RefreshToken from "./RefreshToken.js"

export default class User {
    #name
    #email
    #id
    #passwordHash
    #refreshToken

    constructor(name, email, passwordHash) {
        this.#name = name
        this.#email = email
        this.#passwordHash = passwordHash
        this.#id = uuidv4()
    }

    get name() {
        return this.#name
    }

    set name(val) {
        this.#name = val
    }
    
    get id() {
        return this.#id
    }

    
    get passwordHash() {
        return this.#passwordHash
    }

    set passwordHash(val) {
        this.#passwordHash = val
    }
    
    get email() {
        return this.#email
    }

    set email(val) {
        this.#email = val
    }
    

    get refreshToken() {
        return this.#refreshToken
    }

    set refreshToken(val) {
        this.#refreshToken = val
    }
}