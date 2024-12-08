import { Request, Response } from "express";
import Food from "../models/food.model";
import { IFood } from "../types/allTypes";
import { Error } from "mongoose";

const getAllFoods = async (req: Request, res: Response): Promise<void> => {
  const { price, type } = req.query;
  const query: any = {};
  if (price) query.price = { $lte: Number(price) };
  if (type) query.type = type;

  const foods: IFood[] = await Food.find(query);
  res.json(foods);
};

const getFoodDetails = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  try {
    const food = await Food.findById(id);
    if (!food) return res.status(404).json({ message: "Food not found" });
    res.json(food);
  } catch (err:Error|any) {
    res.status(400).json({ error: err.message });
  }
};

export { getAllFoods, getFoodDetails };
