//@ts-check
import { Schema, model, Document, Model, Types } from "mongoose"

export interface ToDoDocument extends Document {
  boardId: Types.ObjectId
  userId: Types.ObjectId
  text: string
  done: boolean
  createdAt: Date
  lastUpdate: number
  position: number
  deleted: boolean
}


const ToDoSchema: Schema<ToDoDocument> = new Schema<ToDoDocument>({
  userId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  boardId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  text: {
    type: String,
    required: true,
    validate: {
      validator: (v: string): boolean => v.trim().length > 0,
      message: (props: { value: string }): string => `"${props.value}" is invalid todo text value`
    }
  },
  done: {
    type: Boolean,
    default: false
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

ToDoSchema.methods.delete = function (): void {
  this.deleted = true
}

ToDoSchema.pre("save", async function (): Promise<void> {
  this.lastUpdate = Date.now()
})

const ToDo: Model<ToDoDocument> = model<ToDoDocument>("ToDo", ToDoSchema)


export default ToDo