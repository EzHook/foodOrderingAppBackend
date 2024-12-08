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
exports.getFoodDetails = exports.getAllFoods = void 0;
const food_model_1 = __importDefault(require("../models/food.model"));
const getAllFoods = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { price, type } = req.query;
    const query = {};
    if (price)
        query.price = { $lte: Number(price) };
    if (type)
        query.type = type;
    const foods = yield food_model_1.default.find(query);
    res.json(foods);
});
exports.getAllFoods = getAllFoods;
const getFoodDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const food = yield food_model_1.default.findById(id);
        if (!food)
            return res.status(404).json({ message: "Food not found" });
        res.json(food);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});
exports.getFoodDetails = getFoodDetails;
