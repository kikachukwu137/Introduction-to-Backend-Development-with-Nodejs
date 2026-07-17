import { createTour, getAllTours,getTourById ,updateTour,deleteTour} from '../controller/tourController.js';
import { Router } from 'express';
const toursRoutes = Router()


toursRoutes.param('id', (req,res,next,val)=>{
    console.log(`id :${val}`)
    next()
})


toursRoutes.get("/", getAllTours)
toursRoutes.get("/:id", getTourById)
toursRoutes.patch("/:id", updateTour)
toursRoutes.delete("/:id", deleteTour)

toursRoutes.post("/", createTour)

export default toursRoutes