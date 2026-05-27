import express from "express";
import { env } from "../config/env.service.js";
import {  globalErrorHandler } from "./common/response/error.response.js";
import { connectDB } from "./database/connection.js";
import userRoute from "./modules/user/user.route.js";

export const bootstrap =()=>{
    const app = express();
    app.use(express.json());


    app.get("/read",(req,res)=>{
        res.status(200).json({
            success: true,
            data: 34,
            message: "Data fetched successfully",
        });
    });




    app.use("/api", userRoute);

    // not found route
    app.use('{*dummyRoute}', (req, res)=>{
        res.status(404).json({
            success: false,
            message: "This route is not found",
            statusCode: 404,
        })
    });

    app.use(globalErrorHandler);


    connectDB();

    app.listen(env.PORT,()=>{
        console.log(`Server is running on port http://localhost:${env.PORT}`);
    });
}