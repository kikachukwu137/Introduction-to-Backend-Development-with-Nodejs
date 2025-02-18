import Tour from '../models/tour.model.js';
import ErrorWithStatus from '../exception/errorWithStatus.js';

export const getAllTours = async(queryObj) => {
    try {
        ///////////////////////////////////////filtering///////////////////////////////////////////////
          // Create a copy of queryObj to prevent mutation
          const filteredQuery = { ...queryObj };
          
          

          // Excluded fields (pagination, sorting, etc.)
          const excludedFieldsList = ['page', 'sort', 'limit', 'fields'];// remove this keys from filteredQuery
          excludedFieldsList.forEach(el => delete filteredQuery[el]);
  
          
        ////////////////////////////advance filtering//////////////////
          // Convert query object to string for regex processing
          let queryStr = JSON.stringify(filteredQuery);

          // Replace operators (gte, gt, lte, lt) with MongoDB syntax
          queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
  
          // Convert query string back to an object
          let parsedQuery = JSON.parse(queryStr);
        ///////////////////////// sorting//////////////////
        let sortOption ;// initialize it
        if (queryObj.sort) {
            // Convert sort string to MongoDB format (e.g., "price,-rating" => { price: 1, rating: -1 })
            const sortFields = queryObj.sort.split(',').join(' ');
            sortOption = sortFields;
        }
        
        const tours = await Tour.find(parsedQuery).sort(sortOption || '-createdAt' )
        return ({
            status: "success",
            total: tours.length,
            data: tours
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