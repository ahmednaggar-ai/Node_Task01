import dotenv from "dotenv";
import path from "path";

dotenv.config({
    path: path.resolve(process.cwd(), "config/.env")
});

export const env = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    MODE: process.env.MODE,
    JWT_SECRET: process.env.JWT_SECRET?.trim().replace(/^"|"$/g, ""),
}