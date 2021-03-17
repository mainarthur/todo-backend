import { Socket } from 'socket.io'
import User from '../models/User'
import SecureSocket from './SecureSocket'

let interval: NodeJS.Timeout;

const connectionListener = async (socket: SecureSocket) => {
  console.log('connected')
  console.log(await User.findById(socket.payload.id))
  if(interval) {
    clearInterval(interval)
  }
  interval = global.setInterval(() => socket.emit('dataTime', new Date()), 1000)
  socket.on('disconnect', () => {
    console.log('disconnected')
    clearInterval(interval)
  })
}

export default connectionListener
