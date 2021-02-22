import {uuidv4} from "../../utils.js"
import db from "../../db.js"
import ToDo from "../../models/ToDo.js"

export default function addToDo(req, res, body, payload) {
    const { id: userId } = payload
    const { text } = body
    res.setHeader("Content-Type", "application/json")

    if (text != null && typeof text == "string" && text?.trim() !== "") {
        const toDo = new ToDo(text)
        db.todos[userId].push(toDo)

        res.writeHead(200)
        res.write(JSON.stringify({
            status: true,
            result: toDo
        }))
        res.end()
    } else {
        if (text == null) {
            res.writeHead(400)
            res.write(JSON.stringify({
                status: false,
                error: "Bad Request: ToDO text is empty"
            }))
            res.end()
        } else if (typeof text === "string" && text.trim() === "") {
            res.writeHead(400)
            res.write(JSON.stringify({
                status: false,
                error: "Bad Request: ToDO text is empty"
            }))
            res.end()
        } else {
            res.writeHead(400)
            res.write(JSON.stringify({
                status: false,
                error: "Bad Request: ToDO text should be string"
            }))
            res.end()
        }
    }
}