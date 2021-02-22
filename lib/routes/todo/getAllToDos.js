import db from "../../db.js"

export default function getAllToDos(req, res, payload) {
    const { id: userId } = payload
    res.setHeader("Content-Type", "application/json")
    res.writeHead(200)
    res.write(JSON.stringify({
        status: true,
        results: db.todos[userId]
    }))
    res.end()
}