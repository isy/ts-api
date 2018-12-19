import { Document, Schema, model } from "mongoose";

export interface User extends Document {
  name: string;
  age: number;
}

const UserSchema: Schema = new Schema({
  name: { type: String },
  age: { type: Number }
});

export default model<User>("User", UserSchema);
