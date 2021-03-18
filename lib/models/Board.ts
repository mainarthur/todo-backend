//@ts-check
import { Schema, model, Document, Model, Types } from "mongoose"

export interface BoardDocument extends Document {
  users: Types.ObjectId[]
  createdAt: Date
  lastUpdate: number
  position: number
  deleted: boolean
  readonly roomName: string
}


const BoardSchema: Schema<BoardDocument> = new Schema<BoardDocument>({
  users: {
    type: [Schema.Types.ObjectId],
    required: true
  },
  createdAt: {
    type: Number,
    default: Date.now
  },
  lastUpdate: {
    type: Number,
    default: Date.now
  },
  position: {
    type: Number,
    default: -1
  },
  deleted: {
    type: Boolean,
    default: false
  }
})

BoardSchema.virtual('roomName').get(function () {
  return `board-${this.id}`
})

BoardSchema.methods.delete = function (): void {
  this.deleted = true
}

BoardSchema.pre("save", async function (): Promise<void> {
  this.lastUpdate = Date.now()
})

const Board: Model<BoardDocument> = model<BoardDocument>("Board", BoardSchema)


export default Board