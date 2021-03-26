import * as dotenv from "dotenv"
import * as mongoose from 'mongoose'
import { httpServer } from './lib/koa'
import './lib/sockets'

const {
  NODE_ENV
} = process.env

if(NODE_ENV !== 'production') {
  dotenv.config()
}

const {
  PORT, 
  MONGODB_URI,
}: { [key: string]: string} = process.env

void (async (): Promise<void> => {
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
    httpServer.listen(+PORT, (): void => {
        console.log(`[${NODE_ENV || 'development'}]Server is running on ${PORT}`)
    })
})()
