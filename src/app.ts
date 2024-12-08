import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database";
import authRoutes from "./routes/auth.routes";
import foodRoutes from "./routes/food.routes";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/foods", foodRoutes);

export default app;
