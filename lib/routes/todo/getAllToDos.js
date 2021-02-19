import db from "../../db.js"

export default function getAllToDos(req, res) {
    res.setHeader("Content-Type", "application/json")
    res.writeHead(200)
    res.write(JSON.stringify({
        status: true,
        results: db.todos
    }))
    res.end()
}