import db from "../db.js"

export default function debug(req, res, body, payload) {
    console.log(db)
    res.writeHead(200)
    res.end()
}