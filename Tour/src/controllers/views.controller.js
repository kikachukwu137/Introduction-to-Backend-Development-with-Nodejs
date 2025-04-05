import Tour from '../models/tour.model.js'
import {catchAsync} from '../utils/catchAsync.js'

export const getOverview = catchAsync( async(req,res,next)=>{
    const tour = await Tour.find()
    res.status(200)
        .render('base',{
            tour
        })
})


export const getTour = (req,res)=>{
    res.status(200)
        .render('tour',{
            title: 'The Forest hiker',
            user: 'Egwaoje Daniel'
        })
}

export const getError = (req,res)=>{
    res.status(404)
    .render('Error')
}