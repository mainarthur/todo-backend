import db from "../../db.js"


export default function getUser(req, res, payload) {
    const { id: userId } = payload

    const user = db.users.find(u => u.id === userId) 

    res.setHeader("Content-Type", "application/json")

    if(!user) {
        res.writeHead(400)
        res.write(JSON.stringify({
            status: false,
            error: "Bad Request: User not found"
        }))
        res.end()
        return
    }

    res.write(JSON.stringify({
        status: true,
        result: user
    }))
    res.end()
}