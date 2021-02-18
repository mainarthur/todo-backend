
import fs from "fs"

export default function favicon(req, res) {
    res.setHeader('Content-Type', 'image/x-icon')
    fs.createReadStream("./favicon.ico").pipe(res)
    res.end()
}