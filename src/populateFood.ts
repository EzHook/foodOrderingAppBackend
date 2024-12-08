import axios from "axios";
import mongoose, { Error } from "mongoose";
import Food from "./models/food.model";
import dotenv from "dotenv";

dotenv.config();

const API_URL = "https://world.openfoodfacts.org/category/snacks.json";

const fetchFoodData = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "");

    console.log("Connected to MongoDB");

    const { data } = await axios.get(API_URL);
    const products = data.products;

    const foodItems = products.map((product: any) => ({
      name: product.product_name || "Unnamed Product",
      type: product.categories_tags?.[0] || "Unknown",
      price: parseFloat(product.price || "0") || Math.random() * 10 + 1, // Mock price if unavailable
      description: product.ingredients_text || "No description available.",
      image: product.image_url || "No image available.",
    }));

    // Insert data into MongoDB
    await Food.deleteMany(); 
    await Food.insertMany(foodItems);

    console.log("Food data populated successfully!");
  } catch (error: Error | any) {
    console.error("Error populating food data:", error.message);
  } finally {
    mongoose.disconnect();
  }
};

fetchFoodData();
