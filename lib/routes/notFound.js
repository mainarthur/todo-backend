

export default function notFound(req, res) {
    res.setHeader("Content-Type", "application/json")
    res.writeHead(404)
    res.write(JSON.stringify({
        status: false,
        error: "not found"
    }))
    res.end()
}