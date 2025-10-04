import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGODB_URL);
        console.log(`Mongo db connected: ${con.connection.host}`)
    } catch (err) {
        console.log("Mongo db error:", err);
    }
}