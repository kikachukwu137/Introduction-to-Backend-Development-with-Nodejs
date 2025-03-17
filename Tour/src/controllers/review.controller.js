import * as reviewService from '../services/review.service.js';
import { catchAsync } from '../utils/catchAsync.js';

export const getAllReviews =catchAsync(async(req,res,next)=>{
    const allReviews = await reviewService.getAllReview()
    res.status(201).json({
        status: "success",
        result: allReviews.length,
        data: allReviews
    })
})



export const getreview = catchAsync(async(req,res,next)=> {
    const oneReview = await reviewService.getReview(req.params.reviewId)
    console.log(oneReview)
    res.status(201).json({
        status: "success",
        oneReview
        
    })
})


export const createReview = catchAsync(async(req,res,next)=> {
    if (!req.body.tour) req.body.tour = req.params.tourId
    if(!req.body.user) req.body.user = req.user.id
    const newReview = await reviewService.createReview(req.body)
    res.status(201).json({
        status: "success",
        newReview
        
    })
})