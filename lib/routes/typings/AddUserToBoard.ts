import { Types } from 'mongoose'

export default interface AddUserToBoard {
  boardId: Types.ObjectId,
  email: string
}