import { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

export interface IFood extends Document {
  name: string;
  type: string;
  price: number;
  description: string;
  image: string;
}