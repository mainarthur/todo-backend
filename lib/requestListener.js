import { URL } from "url"
import routes from "./routes/index.js"
import db from "./db.js"

export default function requestListener(req, res) {
    if (req.method == "GET") {
        processGetRequest(req, res)
    } else if(req.method == "DELETE") {
        processDeleteRequest(req,res)
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
        case "/getToDo":
            routes.getToDo(req, res)
            break
        case "/getAllToDos":
            routes.getAllToDos(req, res)
            break
        default:
            routes.notFound(req, res)

    }
}

function processPostRequest(req, res, body) {
    const url = new URL(req.url, `http://${process.env.HOSTNAME}`)

    switch (url.pathname) {
        case "/addToDo":
            routes.addToDo(req, res, body)
            break

        default:
            routes.notFound(req, res)
    }
}

function processPatchRequest(req, res, body) {
    const url = new URL(req.url, `http://${process.env.HOSTNAME}`)

    switch(url.pathname) {
        case "/update":
            routes.updateToDo(req, res, body)
            break
        default:
            routes.notFound(req, res)
    }
}

function processDeleteRequest(req, res) {
    const url = new URL(req.url, `http://${process.env.HOSTNAME}`)

    switch(url.pathname) {
        case "/delete":
            routes.deleteToDo(req, res)
            break
        default:
            routes.notFound(req, res)
    }
}