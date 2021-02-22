import { URL } from "url"
import routes from "./routes/index.js"
import processGetRequest from "./routes/get.js"
import processPostRequest from "./routes/post.js"
import processDeleteRequest from "./routes/delete.js"
import processPatchRequest from "./routes/patch.js"

export default function requestListener(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Credentials", "true")
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', "*");

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

            } catch (err) {
                console.log(err)
                res.writeHead(400)
                res.write(JSON.stringify({
                    status: false,
                    error: err.toString()
                }))
                res.end()
            }
        } else if(req.headers["content-type"] != null) {
            res.setHeader("Content-Type", "application/json")
            res.writeHead(400)
            res.write(JSON.stringify({
                status: false,
                error: "Content-Type should be \"application/json\""
            }))
            res.end()
        } else {
            body = {}
        }

        if (req.method == "GET") {
            processGetRequest(req, res, body)
        } else if (req.method == "DELETE") {
            processDeleteRequest(req, res, body)
        } else if (req.method == "OPTIONS") {
            res.writeHead(200)
            res.end()
        } else if (req.method == "POST") {
            processPostRequest(req, res, body)
        } else if (req.method == "PATCH") {
            processPatchRequest(req, res, body)
        } else {
            routes.notFound(req, res)
        }
    })
}
