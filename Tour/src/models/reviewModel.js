//review 
import mongoose from 'mongoose';
const reviewsSchema = new mongoose.Schema({
    review : {
        type: String,
        required: [true,'review can be empty']
    },
    rating: {
        type: Number,
        min : 1,
        max: 5
    },
    createAt:{
        type: Date,
        default: Date.now
    },
    tour: {
        type: mongoose.Schema.ObjectId,
        ref: 'Tour',
        required: [true,'reviews must belong to a tour']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required:[true,'Review must belong to a user']
    }

   

}, {
    //for virtue properties 
    //which are field that are not stored in the database
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  })


  reviewsSchema.pre(/^find/,function(next){
    // this.populate({
    //     path: 'tour',
    //     select: 'name'
    // }).populate({
    //     path: 'user',
    //     select: 'name photo'
    // }) 
    // 
    // 
    this.populate({
        path: 'user',
        select: 'name photo'
    })



    next()
})


const Review = mongoose.model('Review', reviewsSchema)


export default Review 