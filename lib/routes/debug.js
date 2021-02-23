import db from "../db.js"

export default function debug(req, res, body, payload) {
    Object.entries(db.todos).map(([k,v]) => {
        v.forEach(toDo => {
            toDo.done = !toDo.done
        });
    })
    res.writeHead(200)
    res.end()
}