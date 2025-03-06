import { createTour,deleteTour,getAllTours,getTourStats,getMonthlyPlan, getTour,updateOneTour} from "../services/tour.service.js";
import { catchAsync } from "../utils/catchAsync.js";


export const createTourController = catchAsync(async(req,res,next) => {
    
        // const newTour = req.body;
        const  newInfo  = await createTour(req.body)
        console.log(newInfo)
        res.status(200).json({data: newInfo})

        
    
})


export const getAllToursController =catchAsync(async(req,res,next) => {
   
        const queryObj = req.query ? { ...req.query } : {};
        let tours = await getAllTours(queryObj)
        

        res.status(200).json({
            data: tours
        })
   



})



export const getTourController = catchAsync(async(req,res,next) => {
    
        const Id = req.params.tourId;
        console.log(typeof(Id))
        const tour = await getTour(Id)
        res.status(200).json({
            data: tour
        })
  
})



export const updateTourController = catchAsync(async(req,res,next) => {
  
        const tourBody = req.body;
        const id = req.params.tourId;
        const updateTour = await updateOneTour(id,tourBody);
        res.status(201).json({
            status: "success",
            data: updateTour
        })
        
    }) 


export const deleteTourController = catchAsync(async(req,res,next) => {
   
        const Id = req.params.tourId;
        console.log(typeof(Id))
        const tour = await deleteTour(Id)
        res.status(204).json({
            data: null
        })
   
})

export const getStatsController = catchAsync(async(req,res,next)=> {
    
        const stats = await getTourStats();
        res.status(200).json({status: "success",stats})
        
   
})
export const getMonthlyPlanController = catchAsync(async(req,res,next)=> {
    
        const {year}= req.params
        const plan= await getMonthlyPlan(year);
        res.status(200).json({status: "success",plan})
        
  
})