import { URL } from "url"
import db from "../../db.js"

export default function getToDo(req, res, payload) {
    const { id: userId } = payload
    const url = new URL(req.url, `http://${process.env.HOSTNAME}`)

    res.setHeader("Content-Type", "application/json")
    const id = url.searchParams.get("id")

    const toDo = db.todos[userId].find(toDo => toDo.id === id)

    if (toDo) {
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