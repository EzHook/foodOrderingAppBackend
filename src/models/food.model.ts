import mongoose, { Document, Schema } from "mongoose";
import { IFood } from "../types/allTypes";

const FoodSchema: Schema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String },
});

export default mongoose.model<IFood>("Food", FoodSchema);
