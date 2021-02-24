//@ts-check
import { Schema, model } from "mongoose"

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    todos: [{
        type: Schema.Types.ObjectId
    }]
})

const User = model("User", UserSchema)

export default User