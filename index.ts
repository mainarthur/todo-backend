//@ts-check
import * as dotenv from "dotenv"
import * as Koa from "koa"
import * as bodyParser from "koa-bodyparser"
import router from "./lib/routes"
import logger from "./lib/middlewares/logger"
import errorsMiddleware from "./lib/middlewares/errorsMiddleware"
import * as cors from "@koa/cors"
import * as mongoose from "mongoose"
import { Server } from 'socket.io'
import { createServer } from 'http'
import connectionListener from './lib/sockets/connectionListener'
import { verify } from 'jsonwebtoken'
import SecureSocket from './lib/sockets/SecureSocket'

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
    JWT_SECRET,
}: { [key: string]: string} = process.env

const app: Koa = new Koa()
const httpServer = createServer(app.callback())
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

io.use((socket: SecureSocket, next) => {
    const {
        handshake: {
            headers: {
                authorization
            }
        }
    } = socket
    console.log(authorization)
    if(authorization) {
        if(authorization.indexOf('Bearer ') !== 0) {
            console.log(1)
            next(new Error('Authorization Header is required'))
        } else {
            const token = authorization.substring('Bearer '.length)
            console.log(token)
            try {
                const decodedPayload: any = verify(token, JWT_SECRET)
                socket.payload = decodedPayload
                next(null)
            } catch (err) {
                next(err)
                console.log(err)
            } 
        }
    } else {
        console.log(2)
        next(new Error('Authorization Header is required'))
    }
})
io.on('connection', connectionListener)

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
    httpServer.listen(+PORT, HOSTNAME, (): void => {
        console.log(`[${NODE_ENV || 'development'}]Server is running on ${HOSTNAME}:${PORT}`)
    })
})()