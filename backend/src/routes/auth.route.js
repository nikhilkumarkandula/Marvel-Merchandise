import express from "express"
import { signup, login, logout, forgot, verifyOtp, feedbackForm, checkAuth } from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js"

const router = express.Router();

router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)
router.post("/forgot-password", forgot)

router.put("/verify-otp",verifyOtp)
router.post("/feedback", protectRoute, feedbackForm);
router.get("/check", protectRoute, checkAuth)

export default router