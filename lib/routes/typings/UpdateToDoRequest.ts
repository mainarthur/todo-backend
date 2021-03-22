import { Types } from "mongoose"

export interface UpdateToDoRequest {
  boardId: Types.ObjectId
  id: Types.ObjectId
  text?: string
  done?: boolean
  position?: number
}