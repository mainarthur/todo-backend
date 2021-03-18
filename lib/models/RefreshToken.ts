//@ts-check
import { Schema, model, Document, Model, Types } from "mongoose"
import * as crypto from "crypto"


export interface RefreshTokenDocument extends Document {
  userId: Types.ObjectId
  expiresAt: Number
  revoked: Boolean
  token: String
  isExpired(): boolean
  revoke(): void
}

export interface RefreshTokenModel extends Model<RefreshTokenDocument> {
  generateRefreshToken(): string
}

const RefreshTokenSchema: Schema<RefreshTokenDocument> = new Schema<RefreshTokenDocument>({
  userId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  expiresAt: {
    type: Number,
    default: (): number => 2 * 24 * 60 * 60 * 1000 + Date.now()
  },
  revoked: {
    type: Boolean,
    default: false
  },
  token: {
    type: String,
    default: (): string => crypto.randomBytes(256).toString("hex")
  }
})

RefreshTokenSchema.methods.isExpired = function (): boolean {
  // @ts-ignore
  return this.expiresAt < Date.now()
}


RefreshTokenSchema.methods.revoke = function (): void {
  this.expiresAt = 0
  this.revoked = true
}

RefreshTokenSchema.statics.generateRefreshToken = (): string => {
  return crypto.randomBytes(256).toString("hex")
}

const RefreshToken: RefreshTokenModel = model<RefreshTokenDocument, RefreshTokenModel>("RefreshToken", RefreshTokenSchema)

export default RefreshToken