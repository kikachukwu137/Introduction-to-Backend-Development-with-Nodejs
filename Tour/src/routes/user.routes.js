import {Router} from 'express';
import  {signup,login, getAllUser} from '../controllers/user.controller.js';
import { protect} from '../middleware/middleware.tour.js'
import  {forgotPassword,resetPassword} from '../controllers/auth.controller.js';


const userRouter = Router()

userRouter.post('/signup',signup)
userRouter.post('/login',login)
userRouter.post('/forgotPassword',forgotPassword)
userRouter.patch('/resetPassword/:token',resetPassword)


userRouter.get("/",protect,getAllUser)



export default userRouter;