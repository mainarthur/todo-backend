//@ts-check
import { Schema, model } from "mongoose"
import toDo from "./ToDo"

const ToDoSchema = new Schema({
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

ToDoSchema.pre("save", async function(next) {
    // @ts-ignore
    this.lastUpdate = Date.now()
})

const ToDo = model("ToDo", ToDoSchema)


export default ToDo