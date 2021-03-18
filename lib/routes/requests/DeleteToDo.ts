import { Types } from "mongoose"

export interface DeleteToDo {
  toDoId: Types.ObjectId
  boardId: Types.ObjectId
}