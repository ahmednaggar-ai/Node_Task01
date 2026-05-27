import { Router } from "express";
import { getAllUsers, signUpUser, loginUser } from "./user.controller.js";
import { requireAuth } from "../../middlewares/auth.middleware.js";
import { validateBody } from "../../middlewares/validate.middleware.js";
import { loginSchema, signUpSchema } from "./user.validation.js";


const router = Router();


router.get("/user", requireAuth, getAllUsers);

router.post("/user/signup", validateBody(signUpSchema), signUpUser);

router.post("/user/login", validateBody(loginSchema), loginUser);






export default router;