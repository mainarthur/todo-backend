import { Types } from "mongoose"

export interface UpdateToDoRequest {
  boardId: Types.ObjectId
  _id: Types.ObjectId
  text: string
  done: boolean
  createdAt: Date
  lastUpdate: number
  position: number
  deleted: boolean
}