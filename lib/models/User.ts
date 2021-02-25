//@ts-check
import { Schema, model } from "mongoose"
import { isValidEmail, isValidName } from "../utils"

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        validator: {
            validate: (v) => isValidName(v),
            message: (props) => `"${props.value}" is invalid name value`
        }
    },
    email: {
        type: String,
        required: true,
        set: (v) => v.toLowerCase(),
        validator: {
            validate: (v) => isValidEmail(v),
            message: (props) => `"${props.value}" is invalid email value`
        }
    },
    passwordHash: {
        type: String,
        required: true
    }
})

const User = model("User", UserSchema)

export default User