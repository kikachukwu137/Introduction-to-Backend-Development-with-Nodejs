import Review from "../models/reviewModel.js";
import ErrorWithStatus from "../exception/errorWithStatus.js";


export const getAllReview = async() => {
    try {
        const reviews  = await Review.find()
        return ({
            status: "success",
            reviews
        })

    } catch (error) {
        throw new ErrorWithStatus(error.message, error.status || 500)

        
    }
}


export const getReview = async(reviewId) => {
    try {
        if(!reviewId ){
            throw new ErrorWithStatus("No id specific",400)
        }
        const review = await Review.findById(reviewId)
        return ({
            status: "success",
            review
        })

        
        
    } catch (error) {
        throw new ErrorWithStatus(error.message, error.status || 500)
    }
}

export const createReview = async(data)=>{
    try{
        const newReview = await Review.create(data)
        return ({
            status: 'success',
            data : newReview
        })

    }catch(error){
        throw new ErrorWithStatus(error.message,error.status || 500)
    }
   

}