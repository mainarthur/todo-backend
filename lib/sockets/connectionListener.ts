import Board from '../models/Board'
import { ToDoDocument } from '../models/ToDo'
import User from '../models/User'
import { DeleteManyToDos } from '../routes/typings/DeleteManyToDos'
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

  socket.on('update-todo', (toDo: ToDoDocument) => {
    socket.to(Board.getBoardName(toDo.boardId)).emit('update-todo', toDo)
  })
  socket.on('new-todo', (toDo: ToDoDocument) => {
    socket.to(Board.getBoardName(toDo.boardId)).emit('new-todo', toDo)
  })
  socket.on('delete-todos', (body: DeleteManyToDos) => {
    socket.to(Board.getBoardName(body.boardId)).emit('delete-todos', body)
  })
  socket.on('disconnect', () => {
    console.log('disconnected')
  })
}

export default connectionListener
