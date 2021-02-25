import { Document, Model, Schema } from 'mongoose'

interface RefreshToken extends Document {
    userId: Schema.Types.ObjectId;
    expiresAt: Number;
    revoked: Boolean;
    token: String;
    isExpired(): boolean;
}

declare let refreshToken: Model<RefreshToken>;

export = refreshToken;