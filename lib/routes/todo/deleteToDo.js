//@ts-check
import db from "../../db.js"

/**
 * @param {import("koa").ParameterizedContext<any, import("@koa/router").RouterParamContext<any, {}>, any>} ctx
 */
export default async function deleteToDo(ctx) {
    const { id: userId } = payload
    const { pathname } = req.url

    const id = pathname.substring("/todo/".length)
    
    res.setHeader("Content-Type", "application/json")
    
    let deletedToDo = null

    db.todos[userId].forEach(e => {
        if (e.id == id) {
            deletedToDo = e
            e.delete()
        }
        return e.id !== id
    })

    if (deletedToDo !== null) {
        res.writeHead(200)
        res.write(JSON.stringify({
            status: true,
            result: deleteToDo
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