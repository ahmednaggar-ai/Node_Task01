import { env } from "../../config/env.service.js";
import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(env.MONGO_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}