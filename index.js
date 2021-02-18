import http from "http";
import dotenv from "dotenv"
import requestListener from"./lib/requestListener.js"

dotenv.config()

const {
    HOSTNAME,
    PORT
} = process.env

const server = http.createServer(requestListener)

server.listen(PORT, HOSTNAME, () => {
    console.log(`Server is running on http://${HOSTNAME}:${PORT}`)
})