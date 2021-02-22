
import { URL } from "url"
import routes from "./index.js"

export default function processDeleteRequest(req, res, body) {
    const url = new URL(req.url, `http://${process.env.HOSTNAME}`)

    switch (url.pathname) {
        case "/todo":
            routes.auth.verify(req, res, routes.todo.deleteToDo, body)
            break
        default:
            routes.notFound(req, res)
    }
}