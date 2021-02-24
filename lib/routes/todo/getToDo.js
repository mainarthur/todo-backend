//@ts-check

/**
 * @param {import("koa").ParameterizedContext<any, import("@koa/router").RouterParamContext<any, {}>, any>} ctx
 */
export default async function getToDo(ctx) {
    const { id: userId } = payload
    const { pathname } = req.url

    res.setHeader("Content-Type", "application/json")
    const id = pathname.substring("/todo/".length)

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