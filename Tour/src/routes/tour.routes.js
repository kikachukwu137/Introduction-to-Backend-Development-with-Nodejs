import { Router } from "express";
import { createTourController, deleteTourController, getAllToursController, getTourController, updateTourController ,} from "../controllers/tour.controller.js";

const tourRouter = Router();


tourRouter.post("/",createTourController)
tourRouter.get("/",getAllToursController)
tourRouter.get("/:tourId",getTourController)
tourRouter.patch("/:tourId",updateTourController)
tourRouter.delete("/:tourId",deleteTourController)






export default  tourRouter;