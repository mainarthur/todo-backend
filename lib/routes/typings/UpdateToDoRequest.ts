import { Types } from "mongoose"

export interface UpdateToDoRequest {
  boardId: Types.ObjectId
  _id: Types.ObjectId
  text?: string
  done?: boolean
  position?: number
}