import dotenv from "dotenv";
import path from "path";

dotenv.config({
    path: path.resolve("config/.env")
});

export const env = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    MODE: process.env.MODE,
}