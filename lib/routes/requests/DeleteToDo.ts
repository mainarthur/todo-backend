import { ObjectId } from "mongoose";

export interface DeleteToDo {
  toDoId: ObjectId
  boardId: ObjectId
}