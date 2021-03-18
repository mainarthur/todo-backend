import User from '../models/User'
import SecureSocket from './SecureSocket'

const intervals: {[key:string]: NodeJS.Timeout} = {};
let time = new Date()

setInterval(() => time = new Date(), 1000)

const connectionListener = async (socket: SecureSocket) => {
  console.log('connected')
  const user = await User.findById(socket.payload.id)
  const { id: userId } = user
  socket.join(userId)
  intervals[userId] = global.setInterval(() =>{
    console.log(time)
    socket.to(userId).emit('dataTime', time)
  }, 1000)
  socket.on('disconnect', () => {
    console.log('disconnected')
    clearInterval(intervals[userId])
  })
}

export default connectionListener
