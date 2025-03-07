import {Router} from 'express';
import  { getAllUser} from '../controllers/user.controller.js';
import { protect} from '../middleware/middleware.tour.js'
import  {forgotPassword,resetPassword} from '../controllers/auth.controller.js';
import  {signup,login} from '../controllers/auth.controller.js';


const userRouter = Router()

userRouter.post('/signup',signup)
userRouter.post('/login',login)
userRouter.post('/forgotPassword',forgotPassword)
userRouter.patch('/resetPassword/:token',resetPassword)

// +userRouter.patch('/updateMyPassword',protect,updatePassword)


userRouter.get("/",protect,getAllUser)
// userRouter.get("/",getAllUser)






export default userRouter;