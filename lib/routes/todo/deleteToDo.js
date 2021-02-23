import db from "../../db.js"

export default function deleteToDo(req, res, payload) {
    const { id: userId } = payload
    const { pathname } = req.url

    const id = pathname.substring("/todo/".length)
    
    res.setHeader("Content-Type", "application/json")
    
    let deletedToDo = null

    db.todos[userId] = db.todos[userId].filter(e => {
        if (e.id == id) {
            deletedToDo = e
        }
        return e.id !== id
    })

    if (deletedToDo !== null) {
        res.writeHead(200)
        res.write(JSON.stringify({
            status: true,
            results: deleteToDo
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