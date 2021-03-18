import { ObjectId } from 'mongoose'

export interface NewToDoRequest {
    text: string
    boardId: ObjectId
}