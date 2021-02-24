//@ts-check
import { Schema, model } from "mongoose"

const ToDoSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    text: {
        type: String,
        required: true,
        set: function(v) {
            this.lastUpdate = new Date()
            return v
        }
    },
    done: {
        type: Boolean,
        default: false,
        set: function(v) {
            this.lastUpdate = new Date()
            return v
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastUpdate: {
        type: Date,
        default: Date.now
    },
    position: {
        type: Number,
        default: -1,
        set: function(v) {
            this.lastUpdate = new Date()
            return v
        }
    },
    deleted: {
        type: Boolean,
        default: false,
        set: function(v) {
            this.lastUpdate = new Date()
            return v
        }
    }
})

ToDoSchema.methods.delete = function() {
    this.deleted = true
}

const ToDo = model("ToDo", ToDoSchema)

export default ToDo