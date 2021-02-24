//@ts-check
import db from "../../db.js"

/**
 * @param {import("koa").ParameterizedContext<any, import("@koa/router").RouterParamContext<any, {}>, any>} ctx
 */
export default async function getAllToDos(ctx) {
    const { id: userId } = payload
    const from = parseInt(req.url.searchParams.get("from"))

    res.setHeader("Content-Type", "application/json")
    res.writeHead(200)
    if(isNaN(from)) {
        res.write(JSON.stringify({
            status: true,
            results: db.todos[userId]
        }))
    } else {
        res.write(JSON.stringify({
            status: true,
            results: db.todos[userId].filter(todo => {
                return todo.lastUpdate >= from
            })
        }))
    }

    res.end()
    
}