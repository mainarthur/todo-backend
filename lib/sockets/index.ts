import { Server } from 'socket.io'
import * as dotenv from "dotenv"
import connectionListener from './connectionListener'
import { verify } from 'jsonwebtoken'
import SecureSocket from './SecureSocket'
import { httpServer } from '../koa'

const {
  NODE_ENV
} = process.env

if(NODE_ENV !== 'production') {
  dotenv.config()
}

const {
  JWT_SECRET,
}: { [key: string]: string} = process.env


export const io = new Server(httpServer, {
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
  if(authorization) {
      if(authorization.indexOf('Bearer ') !== 0) {
          next(new Error('Authorization Header is required'))
      } else {
          const token = authorization.substring('Bearer '.length)
          try {
              const decodedPayload: any = verify(token, JWT_SECRET)
              socket.payload = decodedPayload
              next(null)
          } catch (err) {
              next(err)
          } 
      }
  } else {
      next(new Error('Authorization Header is required'))
  }
})
io.on('connection', connectionListener)
