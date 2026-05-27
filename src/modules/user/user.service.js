import { createError } from "../../common/response/error.response.js";
import { UserModel } from "../../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "../../../config/env.service.js";

const getUsersList = async () =>{
    const users = await UserModel.find();
    return users;
}


const createUser = async (userData) =>{
    const user = await UserModel.create(userData);
    return user;
}

const loginUser = async (email, password) =>{
    const user = await UserModel.findOne({ email });
    if(!user){
        throw createError("User not found", 404);
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if(!isPasswordCorrect){
        throw createError("Invalid email or password", 401);
    }
    const token = jwt.sign({ userId: user._id }, env.JWT_SECRET, { expiresIn: "5m" });
    return { user, token };
}

const checkUserExists = async (email) =>{
    const user = await UserModel.findOne({ email });
    return user;
};

export { getUsersList, createUser, checkUserExists, loginUser };