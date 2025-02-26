import {Router} from 'express';
import  {signup,login, getAllUser} from '../controllers/user.controller.js';
import {protect} from '../middleware/middleware.tour.js'

const userRouter = Router()

userRouter.post('/signup',signup)
userRouter.post('/login',login)

userRouter.get("/",protect,getAllUser)



export default userRouter;