//@ts-check
import { Schema, model } from "mongoose"
import crypto from "crypto"

const RefreshTokenSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    expiresAt: {
        type: Number,
        default: 2*24*60*60*1000
    },
    revoked: {
        type: Boolean,
        default: false
    },
    token: {
        type: String,
        required: true
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

const RefreshToken = model("RefreshToken", RefreshTokenSchema)

export default RefreshToken