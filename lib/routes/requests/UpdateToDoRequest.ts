import { ObjectId } from "mongoose";

export interface UpdateToDoRequest {
    _id: ObjectId
    userId: string
    text: string
    done: boolean
    createdAt: Date
    lastUpdate: number
    position: number
    deleted: boolean
}