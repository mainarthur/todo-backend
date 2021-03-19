import { Types } from "mongoose"

export interface DeleteManyToDos {
  todos: Array<Types.ObjectId>
  boardId: Types.ObjectId
}