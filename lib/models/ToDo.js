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
        set:
            /**
             * @param {String} v
             */
            function (v) {
                this.lastUpdate = new Date()
                return v
            },
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
        default: false,
        set:
            /**
             * @param {Boolean} v
             */
            function (v) {
                this.lastUpdate = new Date()
                return v
            }
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
        default: -1,
        set:
            /**
             * @param {Number} v
             */
            function (v) {
                this.lastUpdate = new Date()
                return v
            }
    },
    deleted: {
        type: Boolean,
        default: false,
        set:
            /**
             * @param {Boolean} v
             */
            function (v) {
                this.lastUpdate = new Date()
                return v
            }
    }
})

ToDoSchema.methods.delete = function () {
    this.deleted = true
}

const ToDo = model("ToDo", ToDoSchema)

export default ToDo