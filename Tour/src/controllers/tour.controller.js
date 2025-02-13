import { createTour,deleteTour,getAllUser, getTour,updateOneTour} from "../services/tour.service.js";


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


export const getAlluserController = async(req,res) => {
    try {
        const users = await getAllUser()

        res.status(200).json({
            data: users
        })
    } catch (error) {
        res.status(404).json({status: "failed"})
        
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
        
        res.status(404).json({status: "failed"})

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