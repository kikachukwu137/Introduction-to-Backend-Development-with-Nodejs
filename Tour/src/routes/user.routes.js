import {Router} from 'express';
import  { getAllUser, updateMe,deleteMe} from '../controllers/user.controller.js';
import { protect, restrictTo} from '../middleware/middleware.tour.js'
import  {forgotPassword,resetPassword,updatePassword} from '../controllers/auth.controller.js';
import  {signup,login} from '../controllers/auth.controller.js';


const userRouter = Router()

userRouter.post('/signup',signup)
userRouter.post('/login',login)
userRouter.post('/forgotPassword',forgotPassword)
userRouter.patch('/resetPassword/:token',resetPassword)

userRouter.patch('/updateMyPassword',protect,updatePassword)
userRouter.patch('/updateMe',protect,updateMe)
userRouter.delete('/deleteMe',protect,deleteMe)



userRouter.get("/",protect,getAllUser)
// userRouter.get("/",getAllUser)


// reviews





export default userRouter;