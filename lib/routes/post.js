
import { URL } from "url"
import routes from "./index.js"

export default function processPostRequest(req, res, body) {
    const { pathname } = req.url

    switch (pathname) {
        case "/todo":
            routes.auth.verify(req, res, routes.todo.addToDo, body, [body])
            break

        case "/auth/register":
            routes.auth.register(req, res, body)
            break

        case "/auth/login":
            routes.auth.login(req, res,body)
            break
        case "/auth/refresh-token":
            routes.auth.refreshToken(req,res,body)
            break
        default:
            routes.notFound(req, res)
    }
}