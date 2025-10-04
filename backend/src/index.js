import express from "express"
import  dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"

import { connectDB } from "./lib/db.js";

import authRoutes from './routes/auth.route.js'
import cartRoutes from "./routes/cart.route.js"
import orderRoutes from "./routes/order.route.js"

const app = express();

dotenv.config();

// middleware to parse the data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
     origin: "http://localhost:5173",  // Allow frontend domain
     credentials: true  // Allow credentials (cookies, authorization headers, etc.)
 }));

app.use("/api/auth", authRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/orders", orderRoutes)

app.listen(3000, "0.0.0.0", () =>{
     connectDB();
     console.log('Server running on port 3000');
})