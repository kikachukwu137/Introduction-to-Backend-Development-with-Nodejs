import { Router } from "express"; 
import {protect,restrictTo} from '../middleware/middleware.tour.js'
import * as reviewController from '../controllers/review.controller.js'



const reviewRouter = Router({mergeParams: true})

reviewRouter.get("/",protect,reviewController.getAllReviews)
reviewRouter.get("/:reviewId",protect,reviewController.getreview)


reviewRouter.post("/",protect,restrictTo('user'),reviewController.createReview)



export default reviewRouter;