import { ObjectId } from "mongoose";

export interface DeleteManyToDos {
  todos: Array<ObjectId>
  boardId: ObjectId
}