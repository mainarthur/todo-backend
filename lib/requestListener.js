import { URL } from "url"
import routes from "./routes/index.js"

export default function requestListener(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Credentials", "true")
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', "*");

    if (req.method == "GET") {
        processGetRequest(req, res)
    } else if (req.method == "DELETE") {
        processDeleteRequest(req, res)
    } else if (req.method == "POST" || req.method == "PATCH") {
        let body = ""

        req.on("data", (data) => {
            body += data

            if (body.length > 1e6)
                req.destroy()
        })
        req.on("end", () => {
            if (req.headers["content-type"] == "application/json") {
                try {
                    body = JSON.parse(body)
                    if (req.method == "POST") {
                        processPostRequest(req, res, body)
                    } else if (req.method == "PATCH") {
                        processPatchRequest(req, res, body)
                    }
                } catch (err) {
                    console.log(err)
                    res.writeHead(400)
                    res.write(JSON.stringify({
                        status: false,
                        error: err.toString()
                    }))
                    res.end()
                }
            } else {
                res.setHeader("Content-Type", "application/json")
                res.writeHead(400)
                res.write(JSON.stringify({
                    status: false,
                    error: "Content-Type should be \"application/json\""
                }))
                res.end()
            }

        })
    } else if(req.method == "OPTIONS") {
        res.writeHead(200)
        res.end()
    } else {
        routes.notFound(req, res)
    }

}


function processGetRequest(req, res) {
    const url = new URL(req.url, `http://${process.env.HOSTNAME}`)

    switch (url.pathname) {
        case "/favicon.ico":
            routes.favicon(req, res)
            break
        case "/todo":
            routes.todo.getToDo(req, res)
            break
        case "/todo/all":
            routes.todo.getAllToDos(req, res)
            break
        case "/debug":
            routes.auth.verify(req, res, routes.debug, body)
            break
        default:
            routes.notFound(req, res)

    }
}

function processPostRequest(req, res, body) {
    const url = new URL(req.url, `http://${process.env.HOSTNAME}`)

    switch (url.pathname) {
        case "/todo":
            routes.auth.verify(req, res, routes.todo.addToDo, body)
            break

        case "/auth/register":
            routes.auth.register(req, res, body)
            break

        default:
            routes.notFound(req, res)
    }
}

function processPatchRequest(req, res, body) {
    const url = new URL(req.url, `http://${process.env.HOSTNAME}`)

    switch (url.pathname) {
        case "/todo":
            routes.todo.updateToDo(req, res, body)
            break
        default:
            routes.notFound(req, res)
    }
}

function processDeleteRequest(req, res) {
    const url = new URL(req.url, `http://${process.env.HOSTNAME}`)

    switch (url.pathname) {
        case "/todo":
            routes.todo.deleteToDo(req, res)
            break
        default:
            routes.notFound(req, res)
    }
}