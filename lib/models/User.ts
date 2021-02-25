//@ts-check
import { Schema, model, Document } from "mongoose"
import { isValidEmail, isValidName } from "../utils"

export interface UserDocument extends Document {
    name: string;
    email: string;
    passwordHash: string;
}

const UserSchema = new Schema<UserDocument>({
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


const User = model<UserDocument>("User", UserSchema)

export default User