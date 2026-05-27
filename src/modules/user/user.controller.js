import { successResponse } from "../../common/response/success.response.js";
import { checkUserExists, createUser, getUsersList, loginUser as loginUserService } from "./user.service.js";
import bcrypt from "bcrypt";

const getAllUsers = async (req, res, next) => {
    try {
        const users = await getUsersList();

        if (users.length === 0) {
            return successResponse(res, [], "No users found");
        }

        return successResponse(res, users, "Users fetched successfully");
    } catch (error) {
        next(error);
    }
};



const signUpUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const userData = {
            name,
            email,
            password: hashedPassword,
        }
        const userExists = await checkUserExists(email);
        if(userExists){
            return successResponse(res, null, "User already exists");
        }
        const user = await createUser(userData);
        return successResponse(res, user, "User created successfully");
    } catch (error) {
        next(error);
    }
};

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const { user, token } = await loginUserService(email, password);
        return successResponse(res, { user, token }, "Login successful");
    } catch (error) {
        next(error);
    }
};



export { getAllUsers, signUpUser, loginUser };