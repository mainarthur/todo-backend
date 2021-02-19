import { uuidv4 } from "../utils"

class User {
    name
    email
    id
    passwordHash
    todos

    constructor(name, email, passwordHash) {
        this.name = name
        this.email = email
        this.passwordHash = passwordHash
        this.id = uuidv4()
        this.todos = []
    }
}