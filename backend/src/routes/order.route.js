import express from "express"
import { checkout, viewOrders } from "../controllers/order.controller.js"
import { protectRoute } from "../middlewares/auth.middleware.js"

const router = express.Router();

router.post("/checkOut", protectRoute, checkout)
router.get("/viewOrders", protectRoute, viewOrders);

export default router