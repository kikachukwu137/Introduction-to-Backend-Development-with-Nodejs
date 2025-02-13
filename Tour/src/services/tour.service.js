import Tour from '../models/tour.model.js';
import ErrorWithStatus from '../exception/errorWithStatus.js';

export const getAllUser = async() => {
    try {
        const users = await Tour.find()


        return ({
            status: "Good",
            data: users
        }) 

        
    } catch (error) {
        throw new ErrorWithStatus(error.message, error.status || 500)
        
    }
}


export const  createTour = async(bioData)=>{

    try {
        
        if(!bioData || Object.keys(bioData).length === 0) {
            throw new ErrorWithStatus("no body was passed ",400)
        }
        const newTour = await Tour.create(bioData)
        return ({
            status: "success",
            data: newTour
        })
        
        
    } catch (error) {
        throw new ErrorWithStatus(error.message, error.status || 500)
        
    }


}


export const  getTour = async (tourId) =>{
    try {
        const tour = await Tour.findById(tourId)
        if(!tour){
            throw new ErrorWithStatus("this user does not exist",400)
        }
        console.log(tour)
        return ({
            status: "success",
            data : tour

        })
        
    } catch (error) {
        throw new ErrorWithStatus(error.message, error.status || 500)        
    }

}


export const updateOneTour  = async(tourId, newBody) =>{
    try {
        const tour = await Tour.findByIdAndUpdate(tourId,newBody,{new:true,runValidators:true})
        if(!tour){
            throw new ErrorWithStatus("You cant update this field",400)
        }
        return ({
            status: "success",
            data: tour
        })
    } catch (error) {
        throw new ErrorWithStatus(error.message, error.status || 500)        
    }
}


export const  deleteTour = async (tourId) =>{
    try {
        const tour = await Tour.findByIdAndDelete(tourId)
        if(!tour){
            throw new ErrorWithStatus("this user does not exist",400)
        }
        
        return ({
            status: "success",
            data : "file deleted"

        })
        
    } catch (error) {
        throw new ErrorWithStatus(error.message, error.status || 500)        
    }

}