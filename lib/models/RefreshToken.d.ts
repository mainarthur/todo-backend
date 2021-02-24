import { Document, Model } from 'mongoose'

interface RefreshToken extends Document {
    userId: Schema.Types.ObjectId;
    expiresAt: Number;
    revoked: Boolean;
    token: String;
}

let refreshToken: Model<RefreshToken>;

export = refreshToken;