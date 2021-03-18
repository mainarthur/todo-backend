import { ObjectId } from "mongoose";

export interface UpdateToDoRequest {
    boardId: ObjectId
    _id: ObjectId
    text: string
    done: boolean
    createdAt: Date
    lastUpdate: number
    position: number
    deleted: boolean
}