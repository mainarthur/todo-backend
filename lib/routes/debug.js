import db from "../db.js"

export default function debug(req, res, body, payload) {
    res.setHeader("Content-Type", "application/json")
    res.writeHead(200)
    res.write(JSON.stringify(db))
    res.end()
}