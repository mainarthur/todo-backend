import { URL } from "url"
import db from "../../db.js"

export default function deleteToDo(req, res, payload) {
    const { id: userId } = payload

    const url = new URL(req.url, `http://${process.env.HOSTNAME}`)
    
    res.setHeader("Content-Type", "application/json")

    const prevLength = db.todos.length
    const deletedTodos = []

    db.todos[userId] = db.todos[userId].filter(e => {
        if (e.id == url.searchParams.get("id")) {
            deletedTodos.push(e)
        }
        return e.id !== url.searchParams.get("id")
    })

    if (prevLength != db.todos[userId].length) {
        res.writeHead(200)
        res.write(JSON.stringify({
            status: true,
            results: deletedTodos
        }))
    } else {
        res.writeHead(400)
        res.write(JSON.stringify({
            status: false,
            error: "Bad request: ToDo not found"
        }))
    }
    res.end()
}