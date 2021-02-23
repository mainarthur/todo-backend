import { uuidv4 } from "../utils.js"


export default class ToDo {
    #text
    #done
    #id
    #createdAt
    #lastUpdate
    #position

    constructor(text, done = false) {
        if(!text)
            return null
        this.#text = text
        this.#done = done
        this.#id = uuidv4()
        this.#createdAt = Date.now()
        this.#lastUpdate = this.#createdAt
        this.#position = -1
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

    get position() {
        return this.#position
    }

    set position(val) {
        this.#position = val
        this.#lastUpdate = Date.now()
    }

    set lastUpdate(val) {
        this.#lastUpdate = val
    }

    toJSON() {
        return {
            text: this.#text,
            done: this.#done,
            id: this.#id,
            createdAt: this.#createdAt,
            lastUpdate: this.#lastUpdate,
            position: this.#position
        }
    }
}