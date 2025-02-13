import { Router } from "express";
import { createTourController, deleteTourController, getAlluserController, getTourController, updateTourController ,} from "../controllers/tour.controller.js";

const tourRouter = Router();


tourRouter.post("/",createTourController)
tourRouter.get("/",getAlluserController)
tourRouter.get("/:tourId",getTourController)
tourRouter.patch("/:tourId",updateTourController)
tourRouter.delete("/:tourId",deleteTourController)






export default  tourRouter;