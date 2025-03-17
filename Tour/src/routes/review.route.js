import { Router } from "express"; 
import {protect} from '../middleware/middleware.tour.js'
import * as reviewController from '../controllers/review.controller.js'



const reviewRouter = Router()

reviewRouter.get("/",protect,reviewController.getAllReviews)
reviewRouter.get("/:reviewId",protect,reviewController.getAllReviews)


reviewRouter.post("/",reviewController.createReview)



export default reviewRouter;