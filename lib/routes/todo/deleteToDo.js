import { URL } from "url"
import db from "../../db.js"

export default function deleteToDo(req, res, todos) {
    const url = new URL(req.url, `http://${process.env.HOSTNAME}`)
    
    res.setHeader("Content-Type", "application/json")

    const prevLength = db.todos.length
    const deletedTodos = []

    db.todos = db.todos.filter(e => {
        if (e.id == url.searchParams.get("id")) {
            deletedTodos.push(e)
        }
        return e.id !== url.searchParams.get("id")
    })

    if (prevLength != db.todos.length) {
        res.writeHead(200)
        res.write(JSON.stringify({
            status: true,
            results: deletedTodos
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