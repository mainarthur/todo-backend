
import { URL } from "url"
import routes from "./index.js"

export default function processDeleteRequest(req, res, body) {
    const { pathname } = req.url

    if(pathname.startsWith("/todo/") && pathname != "/todo/") {
        routes.auth.verify(req, res, routes.todo.deleteToDo, body)
    } else {
        routes.notFound(req, res)
    }
}