//@ts-check
import { Schema, model, Document } from "mongoose"
import * as crypto from "crypto" 

export interface RefreshTokenDocument extends Document {
    userId: Schema.Types.ObjectId;
    expiresAt: Number;
    revoked: Boolean;
    token: String;
    isExpired(): boolean;
}

const RefreshTokenSchema = new Schema<RefreshTokenDocument>({
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    expiresAt: {
        type: Number,
        default: () => 2*24*60*60*1000 + Date.now()
    },
    revoked: {
        type: Boolean,
        default: false
    },
    token: {
        type: String,
        // @ts-ignore
        default: () => crypto.randomBytes(256).toString("hex")
    }
})

RefreshTokenSchema.methods.isExpired = function() {
    // @ts-ignore
    return this.expiresAt < Date.now()
}


RefreshTokenSchema.methods.revoke = function() {
    this.expiresAt = 0
    this.revoked = true
}

RefreshTokenSchema.static("generateRefreshToken", () => {
    return crypto.randomBytes(256).toString("hex")
})

const RefreshToken = model<RefreshTokenDocument>("RefreshToken", RefreshTokenSchema)

export default RefreshToken