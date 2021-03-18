//@ts-check
import * as Koa from "koa"
import * as bodyParser from "koa-bodyparser"
import router from "./routes"
import logger from "./middlewares/logger"
import errorsMiddleware from "./middlewares/errorsMiddleware"
import * as cors from "@koa/cors"

import { createServer } from 'http'

const app: Koa = new Koa()
export const httpServer = createServer(app.callback())

app.use(bodyParser({
    enableTypes: ["json"]
}))
app.use(logger)
app.use(cors())
app.use(errorsMiddleware)
app.use(router.routes())
app.use(router.allowedMethods());


export default app