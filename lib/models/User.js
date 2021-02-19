import { uuidv4 } from "../utils.js"

export default class User {
    _name
    _email
    _id
    _passwordHash
    _refreshToken

    constructor(name, email, passwordHash) {
        this._name = name
        this._email = email
        this._passwordHash = passwordHash
        this._id = uuidv4()
    }

    get name() {
        return this._name
    }

    set name(val) {
        this._name = val
    }
    
    get id() {
        return this._id
    }

    
    get passwordHash() {
        return this._passwordHash
    }

    set passwordHash(val) {
        this._passwordHash = val
    }
    
    get email() {
        return this._email
    }

    set email(val) {
        this._email = val
    }
    
    get todos() {
        return this._todos
    }

    set todos(val) {
        this._todos = val
    }
    
    get refreshToken() {
        return this._refreshToken
    }

    set refreshToken(val) {
        this._refreshToken = val
    }
}