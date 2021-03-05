//@ts-check
import * as dotenv from "dotenv"
import * as Koa from "koa"
import * as bodyParser from "koa-bodyparser"
import router from "./lib/routes"
import logger from "./lib/middlewares/logger"
import errorsMiddleware from "./lib/middlewares/errorsMiddleware"
import * as cors from "@koa/cors"
import * as mongoose from "mongoose"

const {
    NODE_ENV
} = process.env

if(NODE_ENV !== 'production') {
    dotenv.config()
}

const {
    HOSTNAME,
    PORT, 
    MONGODB_URI,
}: { [key: string]: string} = process.env

const app: Koa = new Koa()

app.use(bodyParser({
    enableTypes: ["json"]
}))
app.use(logger)
app.use(cors())
app.use(errorsMiddleware)
app.use(router.routes())
app.use(router.allowedMethods());



(async (): Promise<void> => {
    try {
        await mongoose.connect(MONGODB_URI, {
            autoIndex: NODE_ENV != "production",
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("DB is connected")
    } catch (err) {
        console.log(err)
        process.exit(1)
    }

    app.listen(+PORT, HOSTNAME, (): void => {
        console.log(`[${NODE_ENV}]Server is running on ${HOSTNAME}:${PORT}`)
    })
})()