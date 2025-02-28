import { Router } from "express";
import { createTourController, deleteTourController, getAllToursController, getMonthlyPlanController, getStatsController, getTourController, updateTourController } from "../controllers/tour.controller.js";
import { tourMiddleWare } from "../middleware/middleware.tour.js";
import {protect,restrictTo} from '../middleware/middleware.tour.js'

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






export default  tourRouter;