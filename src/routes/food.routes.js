"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const food_controller_1 = require("../controllers/food.controller");
const router = express_1.default.Router();
router.get("/", food_controller_1.getAllFoods);
router.get("/:id", food_controller_1.getFoodDetails);
exports.default = router;
