import express from "express";
import { env } from "../config/env.service.js";
import {  globalErrorHandler } from "./common/response/error.response.js";

export const bootstrap =()=>{
    const app = express();


    app.get("/read",(req,res)=>{
        res.status(200).json({
            success: true,
            data: 34,
            message: "Data fetched successfully",
        });
    });




    

    // not found route
    app.use('{*dummyRoute}', (req, res)=>{
        res.status(404).json({
            success: false,
            message: "This route is not found",
            statusCode: 404,
        })
    });

    app.use(globalErrorHandler);

    app.listen(env.PORT,()=>{
        console.log(`Server is running on port http://localhost:${env.PORT}`);
    });
}