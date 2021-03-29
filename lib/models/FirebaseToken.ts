//@ts-check
import { Schema, model, Document, Model, Types } from "mongoose"


export interface FirebaseTokenDocument extends Document {
  userId: Types.ObjectId
  token: String
}

export interface FirebaseTokenModel extends Model<FirebaseTokenDocument> {
}

const FirebaseTokenSchema: Schema<FirebaseTokenDocument> = new Schema<FirebaseTokenDocument>({
  userId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  token: {
    type: String,
    required: true
  }
})

const FirebaseToken: FirebaseTokenModel = model<FirebaseTokenDocument, FirebaseTokenModel>("FirebaseToken", FirebaseTokenSchema)

export default FirebaseToken