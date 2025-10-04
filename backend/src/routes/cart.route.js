import express from "express"
import { addCartItem, getCartItems, deleteCartItem, updateCartItem } from "../controllers/cart.controller.js"
import { protectRoute } from "../middlewares/auth.middleware.js"

const router = express.Router();

router.post("/addToCart", protectRoute, addCartItem)
router.get("/:userId", protectRoute, getCartItems);
router.put("/update/:itemId",  protectRoute, updateCartItem)
router.post("/delete/:itemId", protectRoute, deleteCartItem);

export default router