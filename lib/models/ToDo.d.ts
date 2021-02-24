import { Document, Model, Schema } from 'mongoose'

interface ToDo extends Document {
    userId: Schema.Types.ObjectId;
    text: string;
    done: boolean;
    createdAt: Date;
    lastUpdate: Date;
    position: number;
    deleted: boolean;
}

declare let toDo: Model<ToDo>;

export = toDo;