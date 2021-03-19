import { Types } from 'mongoose'

export interface NewToDoRequest {
  text: string
  boardId: Types.ObjectId
}