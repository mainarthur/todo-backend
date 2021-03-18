import Board from '../models/Board'
import User from '../models/User'
import SecureSocket from './SecureSocket'

const intervals: { [key: string]: NodeJS.Timeout } = {}
let time = new Date()

setInterval(() => time = new Date(), 1000)

const connectionListener = async (socket: SecureSocket) => {
  console.log('connected')
  const user = await User.findById(socket.payload.id)
  const { roomName: userRoomName, _id: userId } = user

  const boards = await Board.find({
    users: userId
  }).exec()

  const rooms = [userRoomName, ...boards.map((board) => board.roomName)]

  socket.join(rooms)



  socket.on('disconnect', () => {
    console.log('disconnected')
  })
}

export default connectionListener
