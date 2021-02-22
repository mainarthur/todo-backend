import db from "../db.js"

export default function updateToDo(req, res, body) {

    res.setHeader("Content-Type", "application/json")
    const {
        id, text, done
    } = body

    const toDo = db.todos.find((e) => e.id == id)

    if(toDo) {
        if(typeof text == "string" && text.trim() != "") {
            toDo.text = text
        }

        if(done != null) {
            toDo.done = done
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