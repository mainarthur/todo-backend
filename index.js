//@ts-check
import dotenv from "dotenv"
import Koa from "koa"
import bodyParser from "koa-bodyparser"
import router from "./lib/routes"
import logger from "./lib/middlewares/logger"
import jwtError from "./lib/middlewares/jwt-error"
import cors from "@koa/cors"

dotenv.config()

const {
    HOSTNAME,
    PORT
} = process.env

const app = new Koa()

app.use(bodyParser({
    enableTypes: ["json"]
}))
app.use(logger)
app.use(cors())
app.use(jwtError)
app.use(router.routes())
app.use(router.allowedMethods())

// @ts-ignore
app.listen(PORT, HOSTNAME, () => {
    console.log(`Server is running on ${HOSTNAME}:${PORT}`)
})