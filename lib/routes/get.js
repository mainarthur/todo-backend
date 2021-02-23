
import { URL } from "url"
import routes from "./index.js"

export default function processGetRequest(req, res, body) {
    const url = new URL(req.url, `http://${process.env.HOSTNAME}`)

    switch (url.pathname) {
        case "/favicon.ico":
            routes.favicon(req, res)
            break
        case "/todo":
            routes.auth.verify(req, res, routes.todo.getToDo)
            break
        case "/todo/all":
            routes.auth.verify(req, res, routes.todo.getAllToDos)
            break
        case "/debug":
            routes.auth.verify(req, res, routes.debug)
            break
        case "/user":
            routes.auth.verify(req, res, routes.user.getUser)
            break
        default:
            routes.notFound(req, res)

    }
}