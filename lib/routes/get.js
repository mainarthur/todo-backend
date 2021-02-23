
import { URL } from "url"
import routes from "./index.js"

export default function processGetRequest(req, res, body) {
    const { pathname } = req.url 

    if(pathname.startsWith("/todo/") && pathname !== "/todo/") {
        return routes.auth.verify(req, res, routes.todo.getToDo)
    } else if(pathname === "/todo") {
        return routes.auth.verify(req, res, routes.todo.getAllToDos)
    }

    switch (pathname) {
        case "/favicon.ico":
            routes.favicon(req, res)
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