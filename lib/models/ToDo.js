import { uuidv4 } from "../utils.js"


export default class ToDo {
    #text
    #done
    #id
    #createdAt
    #lastUpdate

    constructor(text, done = false) {
        this.#text = text
        this.#done = done
        this.#id = uuidv4()
        this.#createdAt = Date.now()
        this.#lastUpdate = this.#createdAt
    }

    get text() {
        return this.#text
    }

    set text(val) {
        this.#text = val
        this.#lastUpdate = Date.now()
    }

    get done() {
        return this.#done
    }

    set done(val) {
        this.#done = val
        this.#lastUpdate = Date.now()
    }


    get id() {
        return this.#id
    }

    get lastUpdate() {
        return this.#lastUpdate
    }

    get createdAt() {
        return this.#createdAt
    }

    toJSON() {
        return {
            text: this.#text,
            done: this.#done,
            id: this.#id,
            createdAt: this.#createdAt,
            lastUpdate: this.#lastUpdate
        }
    }
}