import { createTour,deleteTour,getAllTours,getTourStats,getMonthlyPlan, getTour,updateOneTour} from "../services/tour.service.js";


export const createTourController = async(req,res,next) => {
    try {
        // const newTour = req.body;
        let newInfo  = await createTour(req.body)
        console.log(newInfo)
        res.status(200).json({data: newInfo})

        
    } catch (error) {
        
        // res.status(404).json({message: error.message});
        next(error)
    }
}


export const getAllToursController = async(req,res) => {
    try {
        const queryObj = req.query ? { ...req.query } : {};
        let tours = await getAllTours(queryObj)
        

        res.status(200).json({
            data: tours
        })
    } catch (error) {
        res.status(404).json({status: "failed",message:error.message})
        
    }



}



export const getTourController = async(req,res) => {
    try { 
        const Id = req.params.tourId;
        console.log(typeof(Id))
        const tour = await getTour(Id)
        res.status(200).json({
            data: tour
        })
    } catch (error) {
        
        res.status(404).json({status: "failed",message: error.message})

    }
}



export const updateTourController = async(req,res) => {
    try {
        const tourBody = req.body;
        const id = req.params.tourId;
        const updateTour = await updateOneTour(id,tourBody);
        res.status(201).json({
            status: "success",
            data: updateTour
        })
        
    } catch (error) {
        res.status(404).json({status: "failed", message: error.message})
        
        
    }
}

export const deleteTourController = async(req,res) => {
    try { 
        const Id = req.params.tourId;
        console.log(typeof(Id))
        const tour = await deleteTour(Id)
        res.status(204).json({
            data: null
        })
    } catch (error) {
        
        res.status(404).json({status: "failed", message: error.message})

    }
}

export const getStatsController = async(req,res)=> {
    try {
        const stats = await getTourStats();
        res.status(200).json({status: "success",stats})
        
    } catch (error) {
        res.status(404).json({status: "failed", message: error.message})

        
    }
}
export const getMonthlyPlanController = async(req,res)=> {
    try {
        const {year}= req.params
        const plan= await getMonthlyPlan(year);
        res.status(200).json({status: "success",plan})
        
    } catch (error) {
        res.status(404).json({status: "failed", message: error.message})

        
    }
}