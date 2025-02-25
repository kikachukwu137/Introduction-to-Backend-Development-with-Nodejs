import { Router } from "express";
import * as authController from "../controller/auth.controller.js";
import { generateMiddleWare } from "../middlewares.js/route.middleware.js";
import { loginSchema, registerSchema } from "../validation/auth.validation.js";


const authRoute = Router();
authRoute.post("/login",generateMiddleWare(loginSchema), authController.loginUser)
authRoute.post("/register",generateMiddleWare(registerSchema), authController.registerUser)


export default authRoute;