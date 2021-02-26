export interface UpdateToDoRequest {
    _id: string
    userId: string
    text: string
    done: boolean
    createdAt: Date
    lastUpdate: number
    position: number
    deleted: boolean
}