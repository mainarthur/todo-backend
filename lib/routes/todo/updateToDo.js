//@ts-check
import db from "../../db.js"

export default function updateToDo(req, res, body, payload) {
    const { id: userId } = payload

    res.setHeader("Content-Type", "application/json")
    const {
        id, text, done, position, lastUpdate
    } = body

    const toDo = db.todos[userId].find((e) => e.id == id)

    if(toDo) {
        if(typeof text == "string" && text.trim() != "") {
            toDo.text = text
        }

        if(done != null) {
            toDo.done = done
        }

        if(position) {
            toDo.position = position
        }

        if(lastUpdate) {
            toDo.lastUpdate = lastUpdate
        }

        res.writeHead(200)
        res.write(JSON.stringify({
            status: true,
            result: toDo
        }))
    } else {
        res.writeHead(404)
        res.write(JSON.stringify({
            status: false,
            error: "Bad request: ToDo not found"
        }))
    }
    res.end()
}