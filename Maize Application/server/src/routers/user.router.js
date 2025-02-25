// import { Router } from "express";
// import * as userController from '../controller/user.controller.js';
// import { adminMiddleware } from "../middlewares.js/admin.middleware.js";

// const userRoute = Router();

// userRoute.get("/", adminMiddleware, userController.getAllUsers);



// export default userRoute;

import { Router } from "express";
import * as userController from "../controllers/user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { adminMiddleware } from "../middleware/admin.middleware.js";

const userRoute = Router();

userRoute.get("/", /*adminMiddleware*/ userController.getAllUsers);

export default userRoute;
