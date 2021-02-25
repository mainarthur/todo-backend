//@ts-check
import { Schema, model, Document } from "mongoose"

export interface ToDoDocument extends Document {
    userId: Schema.Types.ObjectId;
    text: string;
    done: boolean;
    createdAt: Date;
    lastUpdate: number;
    position: number;
    deleted: boolean;
}


const ToDoSchema = new Schema<ToDoDocument>({
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    text: {
        type: String,
        required: true,
        validate: {
            /**
            * @param {String} v
            */
            validator: (v) => v.trim().length > 0,
            message: (props) => `"${props.value}" is invalid todo text value`
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

ToDoSchema.methods.delete = function () {
    this.deleted = true
}

ToDoSchema.pre("save", async function() {
    this.lastUpdate = Date.now()
})

const ToDo = model<ToDoDocument>("ToDo", ToDoSchema)


export default ToDo