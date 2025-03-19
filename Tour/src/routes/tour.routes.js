import { Router } from "express";
import { createTourController, deleteTourController, getAllToursController, getMonthlyPlanController, getStatsController, getTourController, updateTourController } from "../controllers/tour.controller.js";
import { tourMiddleWare } from "../middleware/middleware.tour.js";
import {protect,restrictTo} from '../middleware/middleware.tour.js'
// import { createReview } from "../controllers/review.controller.js";
import reviewRouter from '../routes/review.route.js'



const tourRouter = Router();
tourRouter.use("/:tourId/reviews",reviewRouter) // merge magic


tourRouter.get("/stats",getStatsController)
tourRouter.get("/monthly_plan",getMonthlyPlanController)


tourRouter.post("/",createTourController)
// tourRouter.post("/:tourId/reviews",protect,restrictTo('user'),createReview)  //merge magic
tourRouter.get("/",getAllToursController)
tourRouter.get("/top-5-cheap",tourMiddleWare, getAllToursController)

tourRouter.get("/:tourId",getTourController)
tourRouter.patch("/:tourId",updateTourController)
//
tourRouter.delete("/:tourId",protect, restrictTo('admin','lead-guide'),deleteTourController)






export default  tourRouter;













// make folder mkdir
//ls list the content of a folder ls
//cd change folder
//mv  move
//pwd
//touch file
// ls -a

//rmdir




























