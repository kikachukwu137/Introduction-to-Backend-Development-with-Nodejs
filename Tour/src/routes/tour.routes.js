import { Router } from "express";
import { createTourController, deleteTourController, getAllToursController, getMonthlyPlanController, getStatsController, getTourController, updateTourController } from "../controllers/tour.controller.js";
import { tourMiddleWare } from "../middleware/middleware.tour.js";
import {protect,restrictTo} from '../middleware/middleware.tour.js'
import { createReview } from "../services/review.service.js";

const tourRouter = Router();

tourRouter.get("/stats",getStatsController)
tourRouter.get("/monthly_plan",getMonthlyPlanController)


tourRouter.post("/",createTourController)
tourRouter.get("/",getAllToursController)
tourRouter.get("/top-5-cheap",tourMiddleWare, getAllToursController)

tourRouter.get("/:tourId",getTourController)
tourRouter.patch("/:tourId",updateTourController)
//
tourRouter.delete("/:tourId",protect, restrictTo('admin','lead-guide'),deleteTourController)
tourRouter.post("/:tourId/reviews",protect,restrictTo('users'),createReview)






export default  tourRouter;