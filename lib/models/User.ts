//@ts-check
import { Schema, model, Document, Model } from "mongoose"
import { isValidEmail, isValidName } from "../utils"

export interface UserDocument extends Document {
  name: string
  email: string
  passwordHash: string
  readonly roomName: string
}

const UserSchema: Schema<UserDocument> = new Schema<UserDocument>({
  name: {
    type: String,
    required: true,
    validator: {
      validate: (v: string): boolean => isValidName(v),
      message: (props: { value: string }): string => `"${props.value}" is invalid name value`
    }
  },
  email: {
    type: String,
    required: true,
    set: (v: string) => v.toLowerCase(),
    validator: {
      validate: (v: string): boolean => isValidEmail(v),
      message: (props: { value: string }): string => `"${props.value}" is invalid email value`
    }
  },
  passwordHash: {
    type: String,
    required: true
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

UserSchema.virtual('roomName').get(function () {
  return `user-${this.id}`
})

const User: Model<UserDocument> = model<UserDocument>("User", UserSchema)

export default User