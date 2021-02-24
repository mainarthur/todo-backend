import { Document, Model } from 'mongoose'

interface User extends Document {
    name: string;
    email: string;
    passwordHash: string;
}

let user: Model<User>;

export = user;