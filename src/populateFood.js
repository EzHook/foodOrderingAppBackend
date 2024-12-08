"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const mongoose_1 = __importDefault(require("mongoose"));
const food_model_1 = __importDefault(require("./models/food.model"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const API_URL = "https://world.openfoodfacts.org/category/snacks.json";
const fetchFoodData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(process.env.MONGO_URI || "");
        console.log("Connected to MongoDB");
        const { data } = yield axios_1.default.get(API_URL);
        const products = data.products;
        const foodItems = products.map((product) => {
            var _a;
            return ({
                name: product.product_name || "Unnamed Product",
                type: ((_a = product.categories_tags) === null || _a === void 0 ? void 0 : _a[0]) || "Unknown",
                price: parseFloat(product.price || "0") || Math.random() * 10 + 1, // Mock price if unavailable
                description: product.ingredients_text || "No description available.",
                image: product.image_url || "No image available.",
            });
        });
        // Insert data into MongoDB
        yield food_model_1.default.deleteMany();
        yield food_model_1.default.insertMany(foodItems);
        console.log("Food data populated successfully!");
    }
    catch (error) {
        console.error("Error populating food data:", error.message);
    }
    finally {
        mongoose_1.default.disconnect();
    }
});
fetchFoodData();
