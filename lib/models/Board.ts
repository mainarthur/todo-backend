//@ts-check
import { Schema, model, Document, Model, Types } from "mongoose"

export interface BoardDocument extends Document {
  users: Types.ObjectId[]
  name: string
  createdAt: Date
  lastUpdate: number
  position: number
  deleted: boolean
  readonly roomName: string
}

interface BoardModel extends Model<BoardDocument> {
  getBoardName?: (id: Types.ObjectId) => string
}


const BoardSchema: Schema<BoardDocument> = new Schema<BoardDocument>({
  users: {
    type: [Schema.Types.ObjectId],
    required: true
  },
  name: {
    type: String,
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
    default: 0
  },
  deleted: {
    type: Boolean,
    default: false
  }
}, {
  toJSON: {
    transform: (_doc, ret) => {
      ret.id = ret._id
      delete ret._id
      delete ret.__v
    }
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

BoardSchema.statics.getBoardName = (id) => `board-${id}`

const Board: BoardModel = model<BoardDocument>("Board", BoardSchema)


export default Board