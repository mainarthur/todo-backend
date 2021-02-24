import { uuidv4, isValidEmail, isValidName } from "../utils.js"

export default class User {
    #name
    #email
    #id
    #passwordHash
    #refreshToken

    constructor(name, email, passwordHash) {
        if(!name) {
            throw new Error("name is required")
        }
        if(!email) {
            throw new Error("email is required")
        }
        if(!passwordHash) {
            throw new Error("passwordHash is required")
        }
        if(!isValidName(name)) {
            throw new Error("Invalid name format")
        }
        if(!isValidEmail(email)) {
            throw new Error("Invalid email format")
        }

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

    toJSON() {
        return {
            name: this.#name,
            email: this.#email,
            id: this.#id
        }
    }
}