

export default function debug(req, res, body, payload) {
    console.log("CALLED")
    console.log(body)
    console.log(payload)
    res.writeHead(200)
    res.end()
}