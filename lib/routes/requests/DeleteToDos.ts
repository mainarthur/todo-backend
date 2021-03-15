import { ObjectId } from "mongoose";

export interface DeleteToDos {
  todos: Array<ObjectId>
}