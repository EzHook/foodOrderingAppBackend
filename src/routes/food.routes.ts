import express from "express";
import { getAllFoods, getFoodDetails } from "../controllers/food.controller";

const router = express.Router();

router.get("/", getAllFoods);
router.get("/:id", getFoodDetails);

export default router;
