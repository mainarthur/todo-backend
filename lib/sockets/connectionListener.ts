import { Types } from 'mongoose'
import Board, { BoardDocument } from '../models/Board'
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

  socket.on('new-board', (board: BoardDocument) => {
    socket.join(Board.getBoardName(board.id))
    console.log(board)
    socket.to(userRoomName).emit('new-board', board)
  })

  socket.on('delete-board', async (board: BoardDocument) => {
    if (await Board.findOne({ _id: board.id, users: userId })) {
      socket.to(Board.getBoardName(board.id)).emit('delete-board', board)
    }
  })

  socket.on('join-board', async (boardId: Types.ObjectId) => {
    if (await Board.findOne({ _id: boardId, users: userId })) {
      socket.join(Board.getBoardName(boardId))
    }
  })

  socket.on('update-todo', async (toDo: ToDoDocument) => {
    if (await Board.findOne({ _id: toDo.boardId, users: userId })) {
      socket.to(Board.getBoardName(toDo.boardId)).emit('update-todo', toDo)
    }
  })
  socket.on('new-todo', async (toDo: ToDoDocument) => {
    if (await Board.findOne({ _id: toDo.boardId, users: userId })) {
      socket.to(Board.getBoardName(toDo.boardId)).emit('new-todo', toDo)
    }
  })
  socket.on('delete-todos', async (body: DeleteManyToDos) => {
    if (await Board.findOne({ _id: body.boardId, users: userId })) {
      socket.to(Board.getBoardName(body.boardId)).emit('delete-todos', body)
    }
  })
  socket.on('disconnect', () => {
    console.log('disconnected')
  })
}

export default connectionListener
